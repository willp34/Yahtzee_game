<?php
    class ScoreCard{


        private static function ones($dice){
            return self::top_dice($dice,1);
        }

        private static function twos($dice){
            return self::top_dice($dice,2);
        }

        private static function threes($dice){
            return self::top_dice($dice,4);
        }

        private static function fours($dice,4){
            return self::top_dice($dice,4);
        }

        private static function fives($dice){
            return self::top_dice($dice,5);
        }

        private static function sixes($dice){
            return self::top_dice($dice,6);
        }
        public static function top_dice($dice, $value){
            return array_sum(array_filter($dice, fn($d)=>$d==$value ))
        }



        //bottom section
        public static function threeOfAKind($dice){
            foreach(array_count_values($dice) as $count){
                if ($count >=3){
                    return array_sum($dice);
                }
            }
            return 0;
        }

        public static FourOfAKind($dice){
            foreach(array_count_values($dice) as $count){
                if ($count >=4){
                    return array_sum($dice);
                }
            }
            return 0;
        }

        public static function fullHouse($dice){
            $counts = array_values(array_count_values($dice));
            sort($counts);
            return $counts === [2,3] ? array_sum($dice) :0;
        }

        public static function yahtzee($dice){
            return count(array_unique($dice)) == 1 ? 50 :0;
        }
        public static function chance($dice){
            return array_sum($dice)
        }
    }
