
export const getFormattedDateRange = (startDate, endDate) => {

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const formatDate = (date, includeYear) => {
      const day = date.getUTCDate();
      const month = months[date.getUTCMonth()];
      const year = `'${date.getUTCFullYear().toString().substr(-2)}`;
      return includeYear ? `${day} ${month} ${year}` : `${day} ${month}`;
    };

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const today = new Date();

    let fullString = ""

    if (start && start >= today) {
      const formattedStartDate = formatDate(
        start,
        today.getUTCFullYear() !== start.getUTCFullYear()
      );
      fullString += `${formattedStartDate} - `;
    } else {
      fullString += "Ongoing - ";
    }

    if (end) {
      const formattedEndDate = formatDate(
        end,
        today.getUTCFullYear() !== end.getUTCFullYear()
      );
      fullString += `${formattedEndDate}`;
    }

    return fullString;
  };
