/*jslint node: true */
'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            js: {
                files: {
                    'app/tmp/juice-shop.min.js': [ 'app/tmp/juice-shop.js' ]
                },
                options: {
                    mangle: true
                }
            },
            dist: {
                files: {
                    'app/dist/juice-shop.min.js': [ 'app/tmp/juice-shop.min.js' ]
                }
            }
        },

        ngtemplates: {
            myApp: {
                cwd: 'app',
                src: [ 'views/*.html' ],
                dest: 'app/tmp/views.js'
            }
        },

        clean: {
            temp: {
                src: [ 'app/tmp' ]
            },
            dist: {
                src: [ 'app/dist' ]
            },
            pckg: {
                src: [ 'dist' ]
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            js: {
                src: [ 'app/js/**/*.js' ],
                dest: 'app/tmp/juice-shop.js'
            },
            dist: {
                src: [ 'app/tmp/juice-shop.min.js', 'app/tmp/*.js' ],
                dest: 'app/tmp/juice-shop.min.js'
            }
        },

        compress: {
            pckg: {
                options: {
                    archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
                },
                files: [
                    {
                        src: [  'app/index.html',
                            'app/dist/juice-shop.min.js',
                            'app/css/*.css',
                            'app/bower_components/**',
                            'app/public/**',
                            'app/private/**',
                            'server.js',
                            'app.js',
                            'package.json',
                            'LICENSE.md',
                            'data',
                            'lib/*.js',
                            'node_modules/sequelize/**',
                            'node_modules/sqlite3/**',
                            'node_modules/express/**',
                            'node_modules/errorhandler/**',
                            'node_modules/cookie-parser/**',
                            'node_modules/serve-index/**',
                            'node_modules/serve-favicon/**',
                            'node_modules/body-parser/**',
                            'node_modules/sequelize-restful/**',
                            'node_modules/morgan/**',
                            'node_modules/sanitize-html/**',
                            'node_modules/express-jwt/**',
                            'node_modules/jsonwebtoken/**',
                            'node_modules/pdfkit/**',
                            'node_modules/glob/**'
                        ]
                    }
                ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('minify', [ 'clean:dist', 'concat:js', 'uglify:js', 'ngtemplates:myApp', 'concat:dist', 'uglify:dist', 'clean:temp' ]);
    grunt.registerTask('package', [ 'clean:pckg', 'minify', 'compress:pckg' ]);
};