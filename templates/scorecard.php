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
?>
<div class="scorecard">

    <h1>🎲 Yahtzee Scorecard</h1>

    <div class="section">
        <h2>Upper Section</h2>
            <table>
            <?php foreach($cats["top"] as $cat): ?>
                <tr>
                    <td><?= $cat ?></td>
                    <td>
                        <button class="score-btn" data-score="<?= $cat ?>">
                        Select
                        </button>
                    </td>
                </tr>
            <?php endforeach; ?>
            </table>
        </div>

    <div class="section">
        <h2>Lower Section</h2>
        <table>
            <?php foreach($cats["bottom"] as $cat): ?>
                <tr>
                    <td><?= $cat ?></td>
                    <td>
                        <button class="score-btn" data-score="<?= $cat ?>">
                        Select
                        </button>
                    </td>
                </tr>
            <?php endforeach; ?>
        </table>
    </div>

</div>
