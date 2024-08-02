# AI Text Analyser

## Description

AI Text Analyser is a powerful tool designed to process and analyze text using advanced AI technologies. This project leverages various AI-specific libraries to provide comprehensive text analysis capabilities, including natural language processing (NLP), text extraction, and more.

## Table of Contents

- [Usage](#usage)
- [AI Technologies](#ai-technologies)
- [Text Analyser Endpoint](#text-analyser-endpoint)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Usage

To start the project, you can use the following commands:

- **Development Mode:**
  \`\`\`bash
  yarn dev
  \`\`\`

- **Build:**
  \`\`\`bash
  yarn build
  \`\`\`

- **Start:**
  \`\`\`bash
  yarn start
  \`\`\`

## AI Technologies

This project utilizes several cutting-edge AI technologies and libraries, including:

- **LangChain:** A library for building language models and AI applications.

  - \`@langchain/community\`: Provides community-driven integrations and tools.
  - \`@langchain/core\`: Core functionalities for language models.
  - \`@langchain/groq\`: Integration with the GROQ query language.
  - \`@langchain/ollama\`: Integrations for OLAMMA models.
  - \`@langchain/openai\`: Integration with OpenAI's GPT models.

- **OpenAI:** Used for natural language processing and understanding tasks.

  - \`openai\`: The official OpenAI API client for accessing GPT models.

- **LlamaIndex:** A library for creating and querying indexes for large language models.

- **PDF Parsing:** Extracts text from PDF documents for analysis.

  - \`pdf-parse\`: A library to extract text from PDF files.

- **CSV Handling:** Reads and writes CSV files for data processing.
  - \`csv-parser\`: Parses CSV data.
  - \`csv-writer\`: Writes data to CSV files.
  - \`fast-csv\`: A fast CSV parser and writer.

## Text Analyser Endpoint

**URL:** \`/text-analyser\`  
**Method:** \`POST\`  
**Content-Type:** \`application/json\`

### Request Body

The request body should be a JSON object with the following structure:

- \`text\` (string): The text to be analyzed.
- \`additionalContext\` (string, optional): Additional context to be included in the analysis.
- \`expand\` (boolean, optional): Whether to include expanded response details. Default is \`false\`.
- \`jsonFormat\` (object, optional): The desired JSON format for the response. Default is a predefined format.
- \`mode\` (string, optional): The mode of analysis. Can be either \`GROQ\` or \`OPENAI\`. Default is \`GROQ\`.

### Response

The response will be a JSON object containing the analysis results. The structure of the response depends on the \`expand\` parameter:

- If \`expand\` is \`false\` (default):

  - \`done\` (boolean): Indicates if the analysis was successful.
  - \`message\` (string): The analyzed result in the desired JSON format.

- If \`expand\` is \`true\`:
  - \`done\` (boolean): Indicates if the analysis was successful.
  - \`message\` (string): The analyzed result in the desired JSON format.
  - \`response\` (object): The detailed response from the AI model.

### Example Request

```json
{
  "text": "Your text to be analyzed goes here.",
  "additionalContext": "Additional context if any.",
  "expand": true,
  "jsonFormat": {
    "summary": "High-level summary",
    "persons": "List of persons",
    "subject": "Subject of the text"
  },
  "mode": "OPENAI"
}
```

### Example Response

```json
{
  "done": true,
  "message": {
    "summary": "Summary of the text",
    "persons": ["Person 1", "Person 2"],
    "subject": "Subject of the text"
  },
  "response": {
    "message": {
      "content": {
        "summary": "Summary of the text",
        "persons": ["Person 1", "Person 2"],
        "subject": "Subject of the text"
      }
    }
  }
}
```

### AI Models Used

The endpoint supports two modes of analysis using different AI models:

- **GROQ:** Utilizes the GROQ language model for analysis.
- **OpenAI:** Utilizes OpenAI's GPT models for analysis.

Both models are integrated via the \`llamaindex\` library, which provides a consistent interface for interacting with different language models.

## Configuration

Before running the project, ensure you have a \`.env\` file in the root directory with the necessary environment variables. You can use the \`.env.example\` file as a template.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: \`git checkout -b my-feature-branch\`
3. Make your changes and commit them: \`git commit -m 'Add new feature'\`
4. Push to the branch: \`git push origin my-feature-branch\`
5. Create a pull request.

## License

This project is licensed under the MIT License.
