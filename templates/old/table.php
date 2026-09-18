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
