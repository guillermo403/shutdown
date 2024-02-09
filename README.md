# Shutdown

Small application for remotely shutting down the PC.

How to use it:

`pm2 start index.js --name shutdown`

Go to `http://localhost:9876`, enter the time and press the red button.

Works on `Linux`, `MacOS`, and `Windows`.

It can be configured to shut down the computer every day at a specific time. To do this, you need to define the properties `automatic: true` and `time: 22:30` (or whatever time you want the shutdown to occur) in the **settings.json** file.
