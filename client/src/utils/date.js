export const formatDate = (dateString) =>{
    const data = new Date(dateString);
    if(isNaN(data.getTime())){
        return "Invalid Date";
    }

    return dateString.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}