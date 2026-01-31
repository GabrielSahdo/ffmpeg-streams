const binary = require("ffmpeg-static");
const ffprobe = require("ffprobe-static");
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(binary);
ffmpeg.setFfprobePath(ffprobe.path);

const videoPath = process.argv[2];
const numberOfScreenshots = Number(process.argv[3] || 5);

if (!videoPath) {
    console.error("Please provide a video file path as an argument.");
    process.exit(1);
}

ffmpeg(videoPath)
    .on("filenames", function (filenames) {
        console.log("Will generate " + filenames.join(", "));
    })
    .on("end", function () {
        console.log("Screenshots taken");
        process.exit(0);
    })
    .on("error", function (err) {
        console.error("Error: " + err.message);
        process.exit(1);
    })
    .screenshots({
        count: numberOfScreenshots,
        folder: "screenshots",
        filename: "screenshot-%i.png",
    });
