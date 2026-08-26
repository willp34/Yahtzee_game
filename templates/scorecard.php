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

    <h1>🎲 Yahtzee Scorecard</h1>

    <div class="section">
        <h2>Upper Section</h2>
            <table id="score-table">
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
            </table>
        </div>

    <div class="section">
        <h2>Lower Section</h2>
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
        </table>
    </div>

</div>
