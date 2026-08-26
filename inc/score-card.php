<?php
    class ScoreCard{

        /* --------------------- Upeer Section  --------------*/
        public static function ones($dice){
            return self::top_dice($dice,1);
        }

        public static function twos($dice){
            return self::top_dice($dice,2);
        }

        public static function threes($dice){
            return self::top_dice($dice,3);
        }

        public static function fours($dice){
            return self::top_dice($dice,4);
        }

        public static function fives($dice){
            return self::top_dice($dice,5);
        }

        public static function sixes($dice){
            return self::top_dice($dice,6);
        }
        public static function top_dice($dice, $value){
            return array_sum(array_filter($dice, fn($d)=>$d==$value ));
        }



        /* --------------------- Lower Section  --------------*/
        //bottom section
        public static function threeOfAKind($dice){

            foreach(array_count_values($dice) as $count){
                if ($count >=3){
                    return array_sum($dice);
                }
            }
            return 0;
        }

        public static function fourOfAKind($dice){
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
            return $counts === [2,3] ? 25 :0;
        }

        public static function smallStraight($dice){
            $unique = array_unique($dice);
            sort($unique);

            $straights = [
            [1,2,3,4],
            [2,3,4,5],
            [3,4,5,6]
        ];
            foreach($straights as $straight){
                if(count(array_intersect($straight,$unique)) == 4){
                    return 30;
                }
            }
            return 0 ;
        }
        public static function largeStraight($dice){
            $unique = array_unique($dice);
            sort($unique);

            if($unique === [1,2,3,4,5] || $unique === [2,3,4,5,6]){
                return 40;
            }
            return 0;
        }
        public static function yahtzee($dice){
            return count(array_unique($dice)) == 1 ? 50 :0;
        }


        public static function chance($dice){
            return array_sum($dice) ;
        }
        /* --------------------- Helpers  --------------*/

        public static function scoreCategory($category, $dice){

             $methods = [
            'ones'             => 'ones',
            'twos'             => 'twos',
            'threes'           => 'threes',
            'fours'            => 'fours',
            'fives'            => 'fives',
            'sixes'            => 'sixes',
            'three_kind'       => 'threeOfAKind',
            'four_kind'        => 'fourOfAKind',
            'full_house'       => 'fullHouse',
            'small_straight'   => 'smallStraight',
            'large_straight'   => 'largeStraight',
            'yahtzee'          => 'yahtzee',
            'chance'           => 'chance'
            ];

            if(!isset($methods[$category])){
                return 0;
            }

            $method = $methods[$category];

            return Self::$method($dice);
        }
    }
