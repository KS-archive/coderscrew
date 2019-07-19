/* eslint-disable @typescript-eslint/no-var-requires */

const gulp = require('gulp');
const replace = require('gulp-replace');

gulp.task('replace-paths', () => {
  return gulp
    .src('dist/**/*.{ts,tsx,js,map}')
    .pipe(replace('@original-emotion/styled', '@emotion/styled'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.{ts,tsx}', gulp.series('replace-paths'));
});
