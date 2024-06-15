@echo off
setlocal enabledelayedexpansion

REM Define the port number you want to check
set PORT=8081

REM Get the process ID (PID) using netstat and filter it by the specified port
for /f "tokens=5" %%a in ('netstat -aon ^| findstr /r /c:"^.*:%PORT%.*$"') do (
    set PID=%%a
)

REM Start an infinite loop to check if the CMD window is still open
:checkWindow
tasklist /fi "windowtitle eq Administrator:  Command Prompt" | findstr "cmd.exe" >nul
if %errorlevel% equ 1 (
    REM CMD window is closed, terminate the process running on the specific port
    if defined PID (
        echo Killing process with PID %PID% running on port %PORT%...
        taskkill /F /PID %PID%
        echo Process killed successfully.
    ) else (
        echo No process found running on port %PORT%.
    )
    
    goto :end
) else (
    REM CMD window is still open, wait for a moment and check again
    timeout /t 1 >nul
    goto :checkWindow
)

:end
endlocal

npm run dev