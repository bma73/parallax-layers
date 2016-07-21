'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        clean: {
            dist: ['bin/']
        },

        strip: {
            all: {
                src: 'temp/**/*.js',
                options: {
                    inline: true
                }
            }
        },
        concat: {
            dist: {
                options: {
                    stripBanners: true
                },
                src: ['src/*.js'],
                dest: 'bin/parallaxlayers.js'
            }
        },

        uglify: {
            options: {
                mangle: {
                }
            },
            dist: {
                files: {
                    'bin/parallaxlayers.min.js': ['<%= concat.dist.dest %>']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('dist', ['clean:dist', 'concat:dist', 'uglify:dist']);

};