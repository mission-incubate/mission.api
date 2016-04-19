import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
const plugins = <any>gulpLoadPlugins();

export = () => {
    gulp.src('')
        .pipe(plugins.handlebars())
        .pipe(gulp.dest(''));
};
