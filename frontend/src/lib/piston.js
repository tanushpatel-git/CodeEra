const LANGUAGES_VERSION = {
    javascript: {
        language: "nodejs",
        versionIndex: "4"   // Node.js 18 (stable)
    },
    python: {
        language: "python3",
        versionIndex: "4"   // Python 3.10
    },
    java: {
        language: "java",
        versionIndex: "4"   // Java 17
    }
};

const executeCode = async (language, code) => {

    const langConfig = LANGUAGES_VERSION[language];

    if (!langConfig) {
        throw new Error("Unsupported language");
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/run`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            language: langConfig.language,
            versionIndex: langConfig.versionIndex,
            code: code
        })
    });

    const data = await response.json();

    return {
        success: true,
        output: data.output
    };
};

export default executeCode;