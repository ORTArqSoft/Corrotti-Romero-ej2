@echo off

REM Start Redis container using Docker Compose
echo Starting Mongoose container...
docker-compose up -d

REM Get the directory of the batch file
cd %~dp0

REM Open new command prompts to run scripts
start cmd /k "cd %cd% && npm start"

