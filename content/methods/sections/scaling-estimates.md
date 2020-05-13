---
section: scaling-estimates
private: true
---
<h3>Scaling the Estimates to Grade Equivalents</h3>

On the website, we report all data in grade levels, or what we call the Grade (within Cohort) Standardized (GCS) scale. On this scale, users can interpret one unit as one grade level. The national average performance is 3 in Grade 3, 4 in Grade 4, and so on. 
<br><br>
To convert our estimates from the NAEP scale into grade levels, we have to first approximate the average amount student test scores grow in a grade on NAEP. To do this, we use data from three national NAEP cohorts: the cohorts who were in 4th grade in 2009, 2011, and 2013. Below we show the average national NAEP scores in Grades 4 and 8 for these three cohorts. We average over the three cohorts to create a stable baseline, or reference group.
<table class="table-responsive table seda-table">
<thead><tr><th style="border: none;" title="Field #1"></th>
<th title="Field #2">Grade</th>
<th title="Field #3">2009 Cohort</th>
<th title="Field #4">2011 Cohort</th>
<th title="Field #5">2013 Cohort</th>
<th title="Field #6">Average</th>
</tr></thead>
<tbody><tr>
<td rowspan="2">Math</td>
<td>4</td>
<td>238.1</td>
<td>239.2</td>
<td>240.4</td>
<td>239.2</td>
</tr>
<tr>

<td style="border-left-width: 2px;">8</td>
<td>282.7</td>
<td>280.4</td>
<td>280.9</td>
<td>281.3</td>
</tr>
<tr>
<td rowspan="2">Reading</td>
<td>4</td>
<td>217.0</td>
<td>217.8</td>
<td>219.1</td>
<td>218.0</td>
</tr>
<tr>

<td style="border-left-width: 2px;">8</td>
<td>264.8</td>
<td>263.0</td>
<td>264.0</td>
<td>263.9</td>
</tr>
</tbody></table>

We calculate the amount the test scores changed between 4th and 8th grade (Average 4th to 8th Grade Growth) as the average score in 8th grade minus the average score in 4th grade. Then, to get an estimate of per-grade growth, we divide that value by 4 (Average Per-Grade Growth).


<table class="table seda-table table-responsive">
<thead>
<tr>
<th style="border:none;"></th>
<th>Average 4th Grade Score</th>
<th>Average 8th Grade Score</th>
<th>Average 4th to 8th Grade Growth</th>
<th>Average Per-Grade Growth</th>
</tr>
</thead>

<tbody>
<tr>
<td>Math</td>
<td>239.2</td>
<td>281.3</td>
<td>42.1</td>
<td>10.52</td>
</tr>

<tr>
<td>Reading</td>
<td>218.0</td>
<td>263.9</td>
<td>46.0</td>
<td>11.49</td>
</tr>
</tbody>
</table>

Now, we can use these numbers to rescale the SEDA estimates that are on the NAEP scale into grade equivalents. From the SEDA estimates we subtract the 4th-grade average score, divide by the per-grade growth, and add 4.
<br><br>
<h5>Example</h5>

A score of 250 in 4th-grade math becomes:
	(250 – 239.2)/10.52 + 4 = 5.02.

In other words, these students score at a 5th-grade level, or approximately one grade level ahead of the national average (the reference group) in math.

A score of 200 in 3rd-grade reading becomes:
	(200 – 218.0)/11.49 + 4 = 2.44.

In other words, these students score approximately half a grade level behind the national average for 3rd graders in reading.
