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

<div class="bonus-progress-card">
    <div class="bonus-header">
        <span>🎁 Upper Bonus</span>
        <span id="bonus-progress-text">0 / 63</span>
    </div>

    <div class="bonus-progress-bar">
        <div id="bonus-progress-fill"></div>
    </div>

    <div id="bonus-progress-status" class="bonus-status">
    Need 63 more points
    </div>
</div>
<div id="best-move-banner" class="best-move" style="display:none;">
    <span class="star">⭐</span>
<div>
    <strong>Best Move</strong>
    <div id="best-move-text"></div>
    </div>
</div>

<div class="score-totals-card">
    <div class="score-total-box">
        <span>Upper Bonus</span>
        <span id="U-bonus">-</span>
    </div>

    <div class="score-total-box">
        <span>Upper Total</span>
        <span id="U-total">-</span>
    </div>

    <div class="score-total-box">
        <span >Lower Total</span>
        <span id="L-total">-</span>
    </div>

    <div class="score-total-box">
        <span>Grand Total</span>
        <span id="Grand-total">-</span>
    </div>
</div>
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

<table id="score-card-body"></table>
<div>
    <div class="section">
        <div class="section-title">
            <span>Upper Section</span>
            <small> Score each number </small>
        </div>
        <?php foreach ($categories["top"] as $key => $label) : ?>

            <div class="score-row" data-category="<?php echo esc_attr($key); ?>">
                <i data-lucide="circle" class="score-icon"></i>
                <span><?php echo esc_html($label); ?></span>
                <span class="score-value">-</span>
            </div>

        <?php endforeach; ?>

            <div class="score-footer">
                <div>
                    <span>Upper Bonus<span>
                    <span id="U-bonus">-</span>
                </div>
                <div>
                    <span>Upper Total</span>
                    <span id="U-total">-</span>
                </div>
            </div>
    </div>

    <div class="section">
        <div class="section-title">
            <span>Lower Section</span>
            <small> Score each number </small>
        </div>

        <?php foreach ($categories["bottom"] as $key => $label) : ?>

        <div class="score-row" data-category="<?php echo esc_attr($key); ?>">
            <i data-lucide="circle" class="score-icon"></i>
            <span><?php echo esc_html($label); ?></span>
            <span class="score-value">-</span>
        </div>
        <?php endforeach; ?>


        <div class="score-footer">
            <span >Lower Total</span>
            <span id="L-total">-</span>
        </div>
        <div class="score-footer">
            <span>Grand Total</span>
            <span id="Grand-total">-</span>
        </div>
    </div>
</div>
</div>
