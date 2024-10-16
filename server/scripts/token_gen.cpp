#include <iostream>
#include <fstream>
#include <sstream>
#include <random>
#include <string>
#include <regex>

// Function to generate a random string (token)
std::string generateRandomToken(size_t length) {
    const std::string characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%$-!@&*";
    std::random_device rd;
    std::mt19937 generator(rd());
    std::uniform_int_distribution<> distribution(0, characters.size() - 1);

    std::string token;
    for (size_t i = 0; i < length; ++i) {
        token += characters[distribution(generator)];
    }
    return token;
}

// Function to replace old token values in the .env file
void replaceTokenInEnvFile(const std::string& filePath, const std::string& tokenKey, const std::string& newToken) {
    std::ifstream envFileIn(filePath);
    if (!envFileIn) {
        std::cerr << "Error opening .env file." << std::endl;
        return;
    }

    std::ostringstream fileContent;
    fileContent << envFileIn.rdbuf(); // Read entire file content
    envFileIn.close();

    std::string envContent = fileContent.str();
    std::regex tokenRegex(tokenKey + "=.*");
    std::string replacement = tokenKey + "=" + newToken;

    // Replace the token in the content
    envContent = std::regex_replace(envContent, tokenRegex, replacement);

    // Write the new content to the .env file
    std::ofstream envFileOut(filePath);
    if (!envFileOut) {
        std::cerr << "Error writing to .env file." << std::endl;
        return;
    }
    envFileOut << envContent;
    envFileOut.close();
}

int main() {
    std::string envFilePath = "../.v1.env"; // Adjust the path to the .env file if necessary

    // Generate new tokens
    std::string newAccessToken = generateRandomToken(32); // Generate a 32-char token
    std::string newRefreshToken = generateRandomToken(64); // Generate a 64-char token

    // Replace tokens for different user roles in the .env file
    replaceTokenInEnvFile(envFilePath, "ACCESS_TOKEN_SECRET", newAccessToken);
    replaceTokenInEnvFile(envFilePath, "REFRESH_TOKEN_SECRET", newRefreshToken);
    
    replaceTokenInEnvFile(envFilePath, "ACCESS_TOKEN_SECRET_STAFF", generateRandomToken(32));
    replaceTokenInEnvFile(envFilePath, "REFRESH_TOKEN_SECRET_STAFF", generateRandomToken(64));
    
    replaceTokenInEnvFile(envFilePath, "ACCESS_TOKEN_SECRET_ADMIN", generateRandomToken(32));
    replaceTokenInEnvFile(envFilePath, "REFRESH_TOKEN_SECRET_ADMIN", generateRandomToken(64));

    std::cout << "Tokens replaced successfully." << std::endl;

    return 0;
}
