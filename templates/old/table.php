 table upper
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


 table lower


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
