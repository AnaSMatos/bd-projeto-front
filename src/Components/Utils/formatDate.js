export const formatDateToString = (data) => {
    let day = data.getDate();
    let month = data.getMonth() + 1;
    let year = data.getFullYear() % 100; 
  
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    year = year < 10 ? '0' + year : year;
  

    const displayFormat = day + '/' + month + '/' + year;
    const databaseFormat = data.getFullYear()+'-'+month+'-'+day
    return{
        displayFormat,
        databaseFormat
    }
  }
