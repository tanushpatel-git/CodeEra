export const getDifficultyColor = (difficulty) => {
    if (difficulty === "Easy")
        return "bg-green-500/20 text-green-400 border-green-500/30";
    if (difficulty === "Medium")
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    if (difficulty === "Hard")
        return "bg-red-500/20 text-red-400 border-red-500/30";
    return "bg-gray-500/20 text-gray-300 border-gray-500/30";
};