const gulp = require("gulp");
const browserSync = require("browser-sync");

const sass = require("gulp-sass");
sass.compiler = require("node-sass");

const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");

// Static server
gulp.task("server", function () {
    browserSync.init({
        server: {
            baseDir: "dist",
        },
        browser: "chrome",
    });

    gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task("html", function () {
    return gulp
        .src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist"));
});

gulp.task("scripts", function () {
    return gulp.src("src/js/**/*.js").pipe(gulp.dest("dist/js"));
});

gulp.task("fonts", function () {
    return gulp.src("src/fonts/*.*").pipe(gulp.dest("dist/fonts"));
});

gulp.task("mailer", function () {
    return gulp.src("src/mailer/**/*.*").pipe(gulp.dest("dist/mailer"));
});

gulp.task("images", function () {
    return gulp
        .src("src/img/**/*.*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"));
});

gulp.task("icons", function () {
    return gulp
        .src("src/img/icons/*")
        .pipe(gulp.dest("dist/img/icons"))
        .pipe(browserSync.stream());
});

gulp.task("styles", function () {
    return gulp
        .src("src/scss/**/*.+(scss|sass|css)")
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(
            rename({
                prefix: "",
                suffix: ".min",
            })
        )
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task("watch", function () {
    gulp.watch("src/scss/**/*.(sass|scss|css)", gulp.parallel("styles"));
    gulp.watch("src/js/**/*.js", gulp.parallel("scripts"));
    gulp.watch("src/*.html").on("change", gulp.parallel("html"));
});

gulp.task(
    "default",
    gulp.parallel(
        "watch",
        "server",
        "styles",
        "scripts",
        "fonts",
        "mailer",
        "html",
        "images",
        "icons"
    )
);
