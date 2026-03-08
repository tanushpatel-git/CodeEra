export const difficultyStyle = (level) => {
    switch (level) {
        case "Easy":
            return "text-green-400 border-green-400";
        case "Medium":
            return "text-yellow-400 border-yellow-400";
        case "Hard":
            return "text-red-400 border-red-400";
        default:
            return "";
    }
};