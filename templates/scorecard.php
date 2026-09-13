<?php

$cats["top"]=[
    'Ones  ⚀⚀⚀⚀⚀',
    'Twos  ⚁⚁⚁⚁⚁ ',
    'Threes ⚂⚂⚂⚂⚂',
    'Fours ⚃⚃⚃⚃⚃',
    'Fives ⚄⚄⚄⚄⚄',
    'Sixes ⚅⚅⚅⚅⚅'
];
$cats["bottom"] =[
    'Three of a Kind  ⚃⚃⚃⚁⚄',
    'Four of a Kind  ⚁⚁⚁⚁⚄',
    'Full House  ⚃⚃⚃⚁⚁',
    'Small Straight ⚁⚁⚂⚃⚄',
    'Large Straight ⚁⚂⚃⚄⚅',
    'Yahtzee ⚅⚅⚅⚅⚅',
    'Chance ⚄⚀⚄⚂⚂'
];


$categories["top"] = [
    'ones' => 'Ones',
    'twos' => 'Twos',
    'threes' => 'Threes',
    'fours' => 'Fours',
    'fives' => 'Fives',
    'sixes' => 'Sixes'
    ];

$categories["bottom"] = [
    'three_kind' => 'Three of a Kind',
    'four_kind' => 'Four of a Kind',
    'full_house' => 'Full House',
    'small_straight' => 'Small Straight',
    'large_straight' => 'Large Straight',
    'yahtzee' => 'Yahtzee',
    'chance' => 'Chance'
];



?>
<div class="scorecard">
    <div class="scorecard-header">
        <div>
            <span class="scorecard-kicker"> DICE GAME </span>
            <h1>🎲 Yahtzee Scorecard</h1>
        </div>
        <div class="turn-counter">
            <span>Turns : </span>
            <strong id="turns"> </strong>
            <small> /13</small>
        </div>
    </div>


    <div class="section">
        <div class="section-title">
            <span>Upper Section</span>
            <small> Score each number </small>
        </div>

        <table class="score-table">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Score</th>
                </tr>
            </thead>

            <tbody>
                <?php foreach ($categories["top"] as $key => $label) : ?>
                    <tr class="score-row" data-category="<?php echo esc_attr($key); ?>">
                        <td><?php echo esc_html($label); ?></td>
                        <td class="score-value">-</td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
            <tfooter>
                <tr>
                    <td>Upper Bonus</td>
                    <td id="U-bonus">-</td>
                </tr>
                <tr>
                    <td>Upper Total</td>
                    <td id="U-total">-</td>
                </tr>
            </tfooter>
        </table>
    </div>

    <div class="section">
        <div class="section-title">
            <span>Lower Section</span>
            <small> Score each number </small>
        </div>

        <table id="score-table">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Score</th>
                </tr>
            </thead>

            <tbody>
                <?php foreach ($categories["bottom"] as $key => $label) : ?>
                    <tr class="score-row" data-category="<?php echo esc_attr($key); ?>">
                        <td><?php echo esc_html($label); ?></td>
                        <td class="score-value">-</td>
                    </tr>
                <?php endforeach; ?>
            </tbody>

            <tfooter>
                <tr>
                    <td >Lower Total</td>
                    <td id="L-total">-</td>
                </tr>
                <tr>
                    <td >Grand Total</td>
                    <td id="Grand-total">-</td>
                </tr>
            </tfooter>
        </table>
    </div>

</div>
