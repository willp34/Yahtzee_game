<?php



class YG_Game
{
    private array $dice;

    private array $held;

    private array $scores;

    private int $rolls;

    private $turns;

    public function __construct(){

        $this->scores =[];
        $this->dice = [1,1,1,1,1];
        $this->held = [false,false,false,false,false];
        $this->rolls = 0 ;
        $this->turns = 0;
    }

    private static function new_game(){
        $game = new self();

        $game->save();

        return $game;
    }

    public static function load(){
        if(!session_id()){
            session_start() ;
        }

        if(empty($_SESSION['yahtzee_game']) ||
            !is_array($_SESSION['yahtzee_game'])
        ){
            return self::new_game();
        }

        $data = $_SESSION['yahtzee_game'];
        $game = new  self();

        $game->dice = $data['dice'] ?? [1,1,1,1,1];
        $game->held = $data['held'] ?? [false,false,false,false,false];
        $game->rolls = $data['rolls'] ?? 0;
        $game->scores = $data['scores'] ?? [] ;
        $game->turns = $data['turns'] ?? 0;
        return $game;
    }

    public function save(){
        if(!session_id()){
            session_start();
        }

        $_SESSION['yahtzee_game'] = [
            'dice'  => $this->dice,
            'held'  => $this->held,
            'rolls' => $this->rolls,
            'scores'=> $this->scores,
            'turns' => $this->turns,
            'upper_bonus' => $this->get_bonus(),
            'upper_section' => $this->get_upper_total(),
            'lower_section' => $this->get_lower_total(),
            'grand_total' => $this->get_grand_total()
        ];

    }

    public function roll(){
        if($this->rolls >=3){
            return $this->dice;
        }

        for($i=0; $i<5; $i++){
            if(!$this->held[$i]){
                $this->dice[$i] = random_int(1,6);
            }
        }
        $this->rolls++;

        $this->save();
    }

    public function score_category(String $category ){
        // Category already used
        if(isset($this->scores[$category])){
            return false;
        }

        $this->scores[$category] = ScoreCard::scoreCategory($category,$this->dice);

        // Reset turn

        $this->rolls = 0;
        $this->held = [false, false, false, false, false];
        // Optional: clear dice ready for next roll.
        $this->dice = [1,1,1,1,1];
        $this->turns++;
        $this->save();

        return true;
        }


        //ScoreCard

        public function possible_scores($valid_Scores=false): array
        {
            $scores = [
                'ones'           => ScoreCard::ones($this->dice),
                'twos'           => ScoreCard::twos($this->dice),
                'threes'         => ScoreCard::threes($this->dice),
                'fours'          => ScoreCard::fours($this->dice),
                'fives'          => ScoreCard::fives($this->dice),
                'sixes'          => ScoreCard::sixes($this->dice),
                'three_kind'     => ScoreCard::threeOfAKind($this->dice),
                'four_kind'      => ScoreCard::fourOfAKind($this->dice),
                'full_house'     => ScoreCard::fullHouse($this->dice),
                'small_straight' => ScoreCard::smallStraight($this->dice),
                'large_straight' => ScoreCard::largeStraight($this->dice),
                'yahtzee'        => ScoreCard::yahtzee($this->dice),
                'chance'         => ScoreCard::chance($this->dice),
            ];
            if($valid_Scores){
                //arsort($scores);
                return array_filter($scores , fn($value) => $value>0) ;
            }
            return $scores;
        }




    public function set_held($die, $held){
        $this->held[$die] = $held;
        $this->save();
    }

    public function get_dice(){
        return $this->dice;
    }

    public function get_turns(){
        return $this->turns;
    }

    public function get_held(){
        return $this->held;
    }

    public function get_rolls(){
        return $this->rolls;
    }
    /* ----------------------Helper functions-------------------------------*/


    public function get_scores(): array
    {
        return $this->scores;
    }

    public function get_upper_total():int
    {
        $upper = ['ones','twos','threes','fours','fives','sixes'];
        $total = 0;
        foreach($upper as $cat){
            $total+= $this->scores[$cat] ?? 0;
        }
        return $total;
    }

    public function get_bonus():int
    {
        return $this->get_upper_total() >= 63 ? 35 :0;
    }

    public function get_lower_total() :int
    {
        $lower = [
            'three_kind',
            'four_kind',
            'full_house',
            'small_straight',
            'large_straight',
            'yahtzee',
            'chance'
        ];

        $total = 0;
        foreach($lower as $cat){
            $total+= $this->scores[$cat] ?? 0;
        }
        return $total;
    }

    public function get_grand_total() :int
    {
        return $this->get_upper_total()
            + $this->get_bonus()
            + $this->get_lower_total();
    }
}
