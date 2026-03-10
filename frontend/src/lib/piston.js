const LANGUAGES_VERSION = {
    javascript: {
        language: "nodejs",
        versionIndex: "4"
    },
    python: {
        language: "python3",
        versionIndex: "3"
    },
    java: {
        language: "java",
        versionIndex: "4"
    }
};

const executeCode = async (language, code) => {

    const response = await fetch(`${import.meta.env.VITE_API_URL}/run`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            language: language,
            versionIndex: LANGUAGES_VERSION[language].versionIndex,
            code: code
        })
    });

    const data = await response.json();
    console.log(data)
    return {
        success: true,
        output: data.output
    };
};

export default executeCode;