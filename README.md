# Web OTP Generator

A simple, real-time OTP (2FA) code generator that runs in your browser.

<img width="1572" height="1013" alt="image" src="https://github.com/user-attachments/assets/df09e736-31db-40b4-a0bb-b3b8e1a443e7" />

## Running the Project

1.  Make sure you have Docker and Docker Compose installed.
2.  Clone the repository.
3.  Run the following command in the project root:
    ```bash
    docker-compose up -d
    ```
4.  Open your browser and navigate to `http://localhost:8080`.

You can also specify a custom port by setting the `PORT` environment variable:
```bash
PORT=8080 docker-compose up -d
```
Then, you can access the application at `http://localhost:8080`.
