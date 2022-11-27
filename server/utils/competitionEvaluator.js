// NOTE:
// Can't use import as this function runs in the browser (as it's passed to locator.evaluateAll).
// Browser environment isn't the same as the Node.js where we can import modules.
// getCompetitionMatches is the main functions, the rest is helper function that are used inside getCompetitionMatches

export function competitionEvaluator(CompetitionNodes) {
  return CompetitionNodes.map(getCompetitionMatches);

  function getCompetitionMatches(competitionNode) {
    const competition = formatCompetitionName(
      competitionNode.querySelector('.comp_head').textContent
    );

    const matchNode = competitionNode.nextElementSibling;
    const match = formatMatchName(
      matchNode.querySelector('.fLeft').textContent
    );

    const time = getEgyTime(
      matchNode.querySelector('.fLeft_time_live').innerText
    );

    const channels = getChannels(matchNode.querySelector('.fLeft_live')) || [];

    return {
      competition,
      match,
      time,
      channels,
    };
  }

  // Helper Functions
  function formatCompetitionName(competitionName) {
    const [name, stage] = competitionName.split(' - ');
    return { name, stage };
  }

  function formatMatchName(fullMatchName) {
    const [homeTeam, awayTeam] = fullMatchName.split(' v ');
    return { fullText: fullMatchName, homeTeam, awayTeam };
  }

  function getEgyTime(originalTime) {
    const fullTime = originalTime.split(' ')[1];
    const originalHours = fullTime.split(':')[0];
    const formattedHours = (originalHours - 12).toString().padStart(2, '0');
    const minutes = fullTime.split(':')[1].padStart(2, '0');
    const postfix = originalHours <= 12 ? 'AM' : 'PM';
    const rawTime = `${formattedHours}:${minutes}`;
    const fullEgyptTime = `${rawTime} ${postfix}`;
    return { full: fullEgyptTime, raw: rawTime, postfix };
  }

  function getChannels(allChannels) {
    const beinMENA = [];
    const others = [];
    const channelsList = allChannels.querySelectorAll(
      '.chan_live_free, .chan_live_not_free'
    );

    channelsList.forEach((item) => {
      const name = item.textContent.trim().replace(' 📺', '');

      if (name.includes('[app]')) return; // Don't add channels that streams on mobile apps

      if (name.includes('beIN Sports MENA')) {
        const beinMENAChannel = {
          name: name.replace('beIN Sports MENA ', ''),
          commentator: null,
        };
        beinMENA.push(beinMENAChannel);
      } else {
        const onMouseOverText = item.getAttribute('onmouseover');
        const satInfo = onMouseOverText
          ? getChannelMeta(onMouseOverText)
          : null;

        const isFree = item.classList.contains('chan_live_free') ? true : false;

        let isHD = false;
        let is4K = false;
        if (name.includes('4K')) {
          is4K = true;
          isHD = true;
        } else if (name.includes('HD')) {
          isHD = true;
        }
        const mainInfo = { name, isFree, is4K, isHD };

        const channel = { mainInfo, satInfo };

        // Only add the channel if satInfo is not empty
        // (This means that the channel is not covered in MENA region. See getChannelMeta and isSatInMENA for more)
        // (NOTE): For the provided sample page, there's no text in 'onmouseover' attribute
        //         which results in no satInfo, hence no channels will be added even if they are at MENA coverage!
        if (channel.satInfo?.length) others.push(channel);
      }
    });

    sortBeinChannels(beinMENA);
    sortChannels(others);
    return { beinMENA, others };
  }

  function sortBeinChannels(beinChannels) {
    // Sorting Priority: Global, Premium , Max then other channels
    const compareFunction = (a, b) => {
      const globalA = a.name.startsWith('Global');
      const globalB = b.name.startsWith('Global');
      const premiumA = a.name.startsWith('Premium');
      const premiumB = b.name.startsWith('Premium');
      const maxA = a.name.startsWith('Max');
      const maxB = b.name.startsWith('Max');

      if (globalA !== globalB) return globalA ? -1 : 1;
      else if (premiumA !== premiumB) return premiumA ? -1 : 1;
      else if (maxA !== maxB) return maxA ? -1 : 1;
      else return a.name.localeCompare(b.name);
    };

    beinChannels.sort(compareFunction);
  }

  function sortChannels(channels) {
    channels.forEach((channel) => {
      if (channel.satInfo) {
        channel.satInfo.sort((a, b) => {
          if (a.satPosition.value > b.satPosition.value) return 1;
          if (a.satPosition.value < b.satPosition.value) return -1;
          return 0;
        });

        channel.satInfo.sort((a, b) => {
          // Sort the sattelites with the 'W' direction, then 'E' direction
          if (a.satPosition.direction < b.satPosition.direction) return 1;
          if (a.satPosition.direction > b.satPosition.direction) return -1;
          return 0;
        });
      }
    });
  }

  function getChannelMeta(metaText) {
    let sourceSample = metaText;
    const satPositionSelector = 'class="pos_col"';
    const satNameSelector = 'class=rest_col';
    const channelFrequencySelector = 'class="freq_col"';
    const channelSymbolSelector = 'class=rest_col';
    const channelEncryptionSelector = 'class=enc_not_live' || 'class=enc_live';

    const meta = [];

    while (sourceSample.indexOf(satPositionSelector) !== -1) {
      // Sat Position
      const { value: tempSatPosition, newSample: satPositionSample } =
        getVariableValue(satPositionSelector, sourceSample);
      const satPosition = formatSatPosition(tempSatPosition);

      // Sat Name
      const { value: satName, newSample: satNameSample } = getVariableValue(
        satNameSelector,
        satPositionSample
      );

      // Channel Frequency
      const { value: tempFrequency, newSample: channelFrequencySample } =
        getVariableValue(channelFrequencySelector, satNameSample);
      const frequency = formatFrequency(tempFrequency);

      // Channel Symbol
      const { value: symbol, newSample: channelSymbolSample } =
        getVariableValue(channelSymbolSelector, channelFrequencySample);

      // Channel Encryption
      const { value: tempEncryption, newSample: channelEncryptionSample } =
        getVariableValue(channelEncryptionSelector, channelSymbolSample);
      const encryption = formatEncryption(tempEncryption);

      sourceSample = channelEncryptionSample;

      const result = {
        satName,
        satPosition,
        frequency,
        symbol,
        encryption,
      };
      if (isSatInMENA(result)) meta.push(result);
    }

    return meta;
  }

  function getVariableValue(variableSelector, sample) {
    const newSample = sample.substring(
      sample.indexOf(variableSelector) + variableSelector.length + 1
    );
    const closingTagIndex = newSample.indexOf('</td>');
    const value = newSample.substring(0, closingTagIndex);
    return { value, newSample };
  }

  function formatSatPosition(satPosition) {
    const resultArray = satPosition.split('°');
    const [value, direction] = resultArray;
    return { value, direction: direction.toUpperCase() };
  }

  function formatFrequency(frequency) {
    return frequency.replace('.', '');
  }

  function formatEncryption(encryption) {
    return encryption
      .replace('HD ', '')
      .replace('FTA ', '')
      .replace('(', '')
      .replace(')', '');
  }

  function isSatInMENA(satInfo) {
    // Satellite: Support only satellites in range from 35W to 75E
    if (
      (satInfo.satPosition.direction === 'W' &&
        Number(satInfo.satPosition.value) > 35) ||
      (satInfo.satPosition.direction === 'E' &&
        Number(satInfo.satPosition.value) > 75)
    )
      return false;

    // Frequency: Support only frequencies with polarization of H or V
    if (!(satInfo.frequency.includes('H') || satInfo.frequency.includes('V')))
      return false;

    return true;
  }
}
