// Img- Management

export class ImgHub {

    // #region Attributes
    static IMGS = {
        pepe: {
            idle: {
                short: [
                    "./assets/images/misc/2_character_pepe/1_idle/idle/I-1.png",
                    "./assets/images/misc/2_character_pepe/1_idle/idle/I-2.png",
                    "./assets/images/misc/2_character_pepe/1_idle/idle/I-3.png",
                    "./assets/images/misc/2_character_pepe/1_idle/idle/I-4.png",
                    "./assets/images/misc/2_character_pepe/1_idle/idle/I-5.png",
                    "./assets/images/misc/2_character_pepe/1_idle/idle/I-6.png",
                    "./assets/images/misc/2_character_pepe/1_idle/idle/I-7.png",
                    "./assets/images/misc/2_character_pepe/1_idle/idle/I-8.png",
                    "./assets/images/misc/2_character_pepe/1_idle/idle/I-9.png",
                    "./assets/images/misc/2_character_pepe/1_idle/idle/I-10.png",
                ],
                long: [
                    "./assets/images/misc/2_character_pepe/1_idle/long_idle/I-11.png",
                    "./assets/images/misc/2_character_pepe/1_idle/long_idle/I-12.png",
                    "./assets/images/misc/2_character_pepe/1_idle/long_idle/I-13.png",
                    "./assets/images/misc/2_character_pepe/1_idle/long_idle/I-14.png",
                    "./assets/images/misc/2_character_pepe/1_idle/long_idle/I-15.png",
                    "./assets/images/misc/2_character_pepe/1_idle/long_idle/I-16.png",
                    "./assets/images/misc/2_character_pepe/1_idle/long_idle/I-17.png",
                    "./assets/images/misc/2_character_pepe/1_idle/long_idle/I-18.png",
                    "./assets/images/misc/2_character_pepe/1_idle/long_idle/I-19.png",
                    "./assets/images/misc/2_character_pepe/1_idle/long_idle/I-20.png",
                ],
            },
            walk: [
                "./assets/images/misc/2_character_pepe/2_walk/W-21.png",
                "./assets/images/misc/2_character_pepe/2_walk/W-22.png",
                "./assets/images/misc/2_character_pepe/2_walk/W-23.png",
                "./assets/images/misc/2_character_pepe/2_walk/W-24.png",
                "./assets/images/misc/2_character_pepe/2_walk/W-25.png",
                "./assets/images/misc/2_character_pepe/2_walk/W-26.png",
            ],
            jump: [
                "./assets/images/misc/2_character_pepe/3_jump/J-31.png",
                "./assets/images/misc/2_character_pepe/3_jump/J-32.png",
                "./assets/images/misc/2_character_pepe/3_jump/J-33.png",
                "./assets/images/misc/2_character_pepe/3_jump/J-34.png",
                "./assets/images/misc/2_character_pepe/3_jump/J-35.png",
                "./assets/images/misc/2_character_pepe/3_jump/J-36.png",
                "./assets/images/misc/2_character_pepe/3_jump/J-37.png",
                "./assets/images/misc/2_character_pepe/3_jump/J-38.png",
                "./assets/images/misc/2_character_pepe/3_jump/J-39.png",
            ],
            hurt: [
                "./assets/images/misc/2_character_pepe/4_hurt/H-41.png",
                "./assets/images/misc/2_character_pepe/4_hurt/H-42.png",
                "./assets/images/misc/2_character_pepe/4_hurt/H-43.png",
            ],
            dead: [
                "./assets/images/misc/2_character_pepe/5_dead/D-51.png",
                "./assets/images/misc/2_character_pepe/5_dead/D-52.png",
                "./assets/images/misc/2_character_pepe/5_dead/D-53.png",
                "./assets/images/misc/2_character_pepe/5_dead/D-54.png",
                "./assets/images/misc/2_character_pepe/5_dead/D-55.png",
                "./assets/images/misc/2_character_pepe/5_dead/D-56.png",
                "./assets/images/misc/2_character_pepe/5_dead/D-57.png",
            ],
            base: "./assets/images/misc/2_character_pepe/Pepe.png",
        },

        chickens: {
            normal: {
                walk: [
                    "./assets/images/misc/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
                    "./assets/images/misc/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
                    "./assets/images/misc/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
                ],
                dead: [
                    "./assets/images/misc/3_enemies_chicken/chicken_normal/2_dead/dead.png",
                ],
                previewGif: "./assets/images/misc/3_enemies_chicken/chicken_normal/Gallina muestra gif.gif",
                previewPng: "./assets/images/misc/3_enemies_chicken/chicken_normal/Versión Gallinitas.png",
            },
            small: {
                walk: [
                    "./assets/images/misc/3_enemies_chicken/chicken_small/1_walk/1_w.png",
                    "./assets/images/misc/3_enemies_chicken/chicken_small/1_walk/2_w.png",
                    "./assets/images/misc/3_enemies_chicken/chicken_small/1_walk/3_w.png",
                ],
                dead: [
                    "./assets/images/misc/3_enemies_chicken/chicken_small/2_dead/dead.png",
                ],
                previewGif: "./assets/images/misc/3_enemies_chicken/chicken_small/Muestra gif.gif",
                previewPng: "./assets/images/misc/3_enemies_chicken/chicken_small/Versión pollitos.png",
            },
        },

        boss: {
            walk: [
                "./assets/images/misc/4_enemie_boss_chicken/1_walk/G1.png",
                "./assets/images/misc/4_enemie_boss_chicken/1_walk/G2.png",
                "./assets/images/misc/4_enemie_boss_chicken/1_walk/G3.png",
                "./assets/images/misc/4_enemie_boss_chicken/1_walk/G4.png",
            ],
            alert: [
                "./assets/images/misc/4_enemie_boss_chicken/2_alert/G5.png",
                "./assets/images/misc/4_enemie_boss_chicken/2_alert/G6.png",
                "./assets/images/misc/4_enemie_boss_chicken/2_alert/G7.png",
                "./assets/images/misc/4_enemie_boss_chicken/2_alert/G8.png",
                "./assets/images/misc/4_enemie_boss_chicken/2_alert/G9.png",
                "./assets/images/misc/4_enemie_boss_chicken/2_alert/G10.png",
                "./assets/images/misc/4_enemie_boss_chicken/2_alert/G11.png",
                "./assets/images/misc/4_enemie_boss_chicken/2_alert/G12.png",
            ],
            attack: [
                "./assets/images/misc/4_enemie_boss_chicken/3_attack/G13.png",
                "./assets/images/misc/4_enemie_boss_chicken/3_attack/G14.png",
                "./assets/images/misc/4_enemie_boss_chicken/3_attack/G15.png",
                "./assets/images/misc/4_enemie_boss_chicken/3_attack/G16.png",
                "./assets/images/misc/4_enemie_boss_chicken/3_attack/G17.png",
                "./assets/images/misc/4_enemie_boss_chicken/3_attack/G18.png",
                "./assets/images/misc/4_enemie_boss_chicken/3_attack/G19.png",
                "./assets/images/misc/4_enemie_boss_chicken/3_attack/G20.png",
            ],
            hurt: [
                "./assets/images/misc/4_enemie_boss_chicken/4_hurt/G21.png",
                "./assets/images/misc/4_enemie_boss_chicken/4_hurt/G22.png",
                "./assets/images/misc/4_enemie_boss_chicken/4_hurt/G23.png",
            ],
            dead: [
                "./assets/images/misc/4_enemie_boss_chicken/5_dead/G24.png",
                "./assets/images/misc/4_enemie_boss_chicken/5_dead/G25.png",
                "./assets/images/misc/4_enemie_boss_chicken/5_dead/G26.png",
            ],
            image: "./assets/images/misc/4_enemie_boss_chicken/Señora_gallina.png",
            spriteSheet: "./assets/images/misc/4_enemie_boss_chicken/all_sequences.gif",
        },

        background: {
            complete: "./assets/images/misc/5_background/complete_background.png",
            firstHalf: "./assets/images/misc/5_background/first_half_background.png",
            secondHalf: "./assets/images/misc/5_background/second_half_background.png",
            layers: {
                first: {
                    tiles: [
                        "./assets/images/misc/5_background/layers/1_first_layer/1.png",
                        "./assets/images/misc/5_background/layers/1_first_layer/2.png",
                    ],
                    full: "./assets/images/misc/5_background/layers/1_first_layer/full.png",
                },
                second: {
                    tiles: [
                        "./assets/images/misc/5_background/layers/2_second_layer/1.png",
                        "./assets/images/misc/5_background/layers/2_second_layer/2.png",
                    ],
                    full: "./assets/images/misc/5_background/layers/2_second_layer/full.png",
                },
                third: {
                    tiles: [
                        "./assets/images/misc/5_background/layers/3_third_layer/1.png",
                        "./assets/images/misc/5_background/layers/3_third_layer/2.png",
                    ],
                    full: "./assets/images/misc/5_background/layers/3_third_layer/full.png",
                },
                clouds: {
                    tiles: [
                        "./assets/images/misc/5_background/layers/4_clouds/1.png",
                        "./assets/images/misc/5_background/layers/4_clouds/2.png",
                    ],
                    full: "./assets/images/misc/5_background/layers/4_clouds/full.png",
                },
                air: "./assets/images/misc/5_background/layers/air.png",
            },
        },

        bottles: {
            ground: [
                "./assets/images/misc/6_salsa_bottle/1_salsa_bottle_on_ground.png",
                "./assets/images/misc/6_salsa_bottle/2_salsa_bottle_on_ground.png",
            ],
            single: "./assets/images/misc/6_salsa_bottle/salsa_bottle.png",
            rotation: [
                "./assets/images/misc/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
                "./assets/images/misc/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
                "./assets/images/misc/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
                "./assets/images/misc/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
            ],
            splash: [
                "./assets/images/misc/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
                "./assets/images/misc/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
                "./assets/images/misc/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
                "./assets/images/misc/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
                "./assets/images/misc/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
                "./assets/images/misc/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
            ],
            rotationGif: "./assets/images/misc/6_salsa_bottle/bottle_rotation/rotation_sequences.gif",
            allSequencesGif: "./assets/images/misc/6_salsa_bottle/all_sequences.gif",
        },

        statusbars: {
            coin: {
                blue: [
                    "./assets/images/misc/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
                ],
                green: [
                    "./assets/images/misc/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
                ],
                orange: [
                    "./assets/images/misc/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
                ],
            },

            health: {
                blue: [
                    "./assets/images/misc/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
                ],
                green: [
                    "./assets/images/misc/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
                ],
                orange: [
                    "./assets/images/misc/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png",
                ],
            },

            bottle: {
                blue: [
                    "./assets/images/misc/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
                ],
                green: [
                    "./assets/images/misc/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
                ],
                orange: [
                    "./assets/images/misc/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
                    "./assets/images/misc/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
                ],
            },

            endboss: {
                blue: [
                    "./assets/images/misc/7_statusbars/2_statusbar_endboss/blue/blue0.png",
                    "./assets/images/misc/7_statusbars/2_statusbar_endboss/blue/blue20.png",
                    "./assets/images/misc/7_statusbars/2_statusbar_endboss/blue/blue40.png",
                    "./assets/images/misc/7_statusbars/2_statusbar_endboss/blue/blue60.png",
                    "./assets/images/misc/7_statusbars/2_statusbar_endboss/blue/blue80.png",
                    "./assets/images/misc/7_statusbars/2_statusbar_endboss/blue/blue100.png",
                ],
                green: [
                    "./assets/images/misc/7_statusbars/2_statusbar_endboss/green/green0.png",
                    "./assets/images/misc/7_statusbars/2_statusbar_endboss/green/green20.png",
                    "./assets/images/misc/7_statusbars/2_statusbar_endboss/green/green40.png",
                    "./assets/images/misc/7_statusbars/2_statusbar_endboss/green/green60.png",
                    "./assets/images/misc/7_statusbars/2_statusbar_endboss/green/green80.png",
                    "./assets/images/misc/7_statusbars/2_statusbar_endboss/green/green100.png",
                ],
                orange: [
                    "./assets/images/misc/7_statusbars/2_statusbar_endboss/orange/orange0.png",
                    "./assets/images/misc/7_statusbars/2_statusbar_endboss/orange/orange20.png",
                    "./assets/images/misc/7_statusbars/2_statusbar_endboss/orange/orange40.png",
                    "./assets/images/misc/7_statusbars/2_statusbar_endboss/orange/orange60.png",
                    "./assets/images/misc/7_statusbars/2_statusbar_endboss/orange/orange80.png",
                    "./assets/images/misc/7_statusbars/2_statusbar_endboss/orange/orange100.png",
                ],
                bar: {
                    blue: "./assets/images/misc/7_statusbars/2_statusbar_endboss/blue.png",
                    green: "./assets/images/misc/7_statusbars/2_statusbar_endboss/green.png",
                    orange: "./assets/images/misc/7_statusbars/2_statusbar_endboss/orange.png",
                },
            },

            barElements: {
                empty: "./assets/images/misc/7_statusbars/4_bar_elements/statusbar_empty.png",
                blue: "./assets/images/misc/7_statusbars/4_bar_elements/statusbar_blue.png",
                green: "./assets/images/misc/7_statusbars/4_bar_elements/statusbar_green.png",
                orange: "./assets/images/misc/7_statusbars/4_bar_elements/statusbar_orange.png",
            },

            icons: {
                coin: "./assets/images/misc/7_statusbars/3_icons/icon_coin.png",
                health: "./assets/images/misc/7_statusbars/3_icons/icon_health.png",
                healthEndboss: "./assets/images/misc/7_statusbars/3_icons/icon_health_endboss.png",
                bottle: "./assets/images/misc/7_statusbars/3_icons/icon_salsa_bottle.png",
            },

            examples: [
                "./assets/images/misc/7_statusbars/example_1.png",
                "./assets/images/misc/7_statusbars/example_2.png",
                "./assets/images/misc/7_statusbars/example_3.png",
                "./assets/images/misc/7_statusbars/example_4.png",
            ],
            allStatusbars: "./assets/images/misc/7_statusbars/all_statusbars.png",
        },


        coins: [
            "./assets/images/misc/8_coin/coin_1.png",
            "./assets/images/misc/8_coin/coin_2.png",
        ],

        screens: {
            start: {
                screen1: "./assets/images/misc/9_intro_outro_screens/start/startscreen_1.png",
                screen2: "./assets/images/misc/9_intro_outro_screens/start/startscreen_2.png",
            },
            gameOverFolder: {
                example: "./assets/images/misc/9_intro_outro_screens/game_over/example.png",
                gameOver: "./assets/images/misc/9_intro_outro_screens/game_over/game over.png",
                gameOverExcl: "./assets/images/misc/9_intro_outro_screens/game_over/game over!.png",
                youLost: "./assets/images/misc/9_intro_outro_screens/game_over/you lost.png",
                ohNoYouLost: "./assets/images/misc/9_intro_outro_screens/game_over/oh no you lost!.png",
            },
            youWonLost: {
                gameOverA: "./assets/images/misc/You won, you lost/Game over A.png",
                gameOver: "./assets/images/misc/You won, you lost/Game Over.png",
                youLost: "./assets/images/misc/You won, you lost/You lost.png",
                youLostB: "./assets/images/misc/You won, you lost/You lost b.png",
                youWinA: "./assets/images/misc/You won, you lost/You Win A.png",
                youWinB: "./assets/images/misc/You won, you lost/You win B.png",
                youWonA: "./assets/images/misc/You won, you lost/You won A.png",
                youWonB: "./assets/images/misc/You won, you lost/You Won B.png",
            },
        },
    };
    // #endregion Attributes
}
