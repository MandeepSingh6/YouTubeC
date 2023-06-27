export const SUGGESTION_API =
  "https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const formatNumber = (input) => {
  const ranges = [
    {
      divider: 1e3,
      suffix: "K",
    },
    {
      divider: 1e6,
      suffix: "M",
    },
    {
      divider: 1e9,
      suffix: "B",
    },
  ];
  for (let index = ranges.length - 1; index >= 0; index--) {
    if (input > ranges[index].divider) {
      let quotient = input / ranges[index].divider;

      if (quotient < 10) {
        quotient = Math.floor(quotient * 10) / 10;
      } else {
        quotient = Math.floor(quotient);
      }

      return quotient.toString() + ranges[index].suffix;
    }
  }

  return input.toString();
};

export const YTDurationToTime = (duration) => {
  try {
    var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    match = match.slice(1).map(function (x) {
      if (x != null) {
        return x.replace(/\D/, "");
      }
    });
    var hours = parseInt(match[0]) || 0;
    var minutes = parseInt(match[1]) || 0;
    var seconds = parseInt(match[2]) || 0;
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const totalMs = totalSeconds * 1000;
    const result = new Date(totalMs).toISOString().slice(11, 19);
    if (result[1] === "0" && result[0]) {
      return result.slice(3);
    }
    return result;
  } catch (err) {
    console.log(err);
  }
};
