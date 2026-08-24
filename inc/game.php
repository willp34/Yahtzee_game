<?php



class YG_Game
{
    private array $dice;

    private array $held;

    private int $rolls;

    private array $scores;


    public function __construct(){

        $this->dice = [1,1,1,1,1];
        $this->held = [false,false,false,false,false];
        $this->rolls = 0 ;
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

        return $game;
    }

    public function save(){
        if(!session_id()){
            session_start();
        }

        $_SESSION['yahtzee_game'] = [
            'dice'  => $this->dice,
            'held'  => $this->held,
            'rolls' => $this->rolls
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
        return $this->dice;

    }

    public function set_held($die, $held){
        $this->held[$die] = $held;
        $this->save();
    }

    public function get_dice(){
        return $this->dice;
    }

    public function get_held(){
        return $this->held;
    }

    public function get_rolls(){
        return $this->rolls;
    }
}
