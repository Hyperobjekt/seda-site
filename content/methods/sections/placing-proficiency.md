---
section: placing-proficiency
private: true
---

<h3>Placing the proficiency thresholds on the same scale</h3>

As discussed above, we cannot compare proficiency thresholds across places, grades, and years because states use different tests with completely different scales and set their proficiency thresholds at different levels of mastery. Knowing that a proficiency threshold is one standard deviation above the state average score does not help us compare proficiency thresholds across places, grades, or years because we do not know how a state’s average score in one grade and year compares to that in other states, grades, and years.

Luckily, we can use the National Assessment of Educational Progress (NAEP), a test taken in every state, to place the thresholds on the same scale. This step facilitates comparisons across states, grades, and years.

A random sample of students in every state takes the NAEP assessment in Grades 4 and 8 in math and RLA in odd years (e.g., 2009, 2011, 2013, 2015, 2017, and 2019). From NAEP, then, we know the relative performance of states on the NAEP assessment. In the grades and years when NAEP assessments were not administered to students, we average the scores in the grades and years just before and just after to obtain estimates for untested grades, subjects, and years.

We use the states’ NAEP results in each grade, year, and subject to rescale the thresholds to the NAEP scale. For each subject, grade, and year, we multiply the thresholds by the state’s NAEP standard deviation and add the state’s NAEP average score.

<br><br>

<h5>Example: State A, Grade 4 reading in 2014–15</h5>

The average score and standard deviation of State A NAEP scores in Grade 4 reading in 2014–15 were:

- Mean NAEP Score: 200
- Standard Deviation of NAEP Score: 40

We have three thresholds:

- Threshold 1: -0.75
- Threshold 2: 0.05
- Threshold 3: 1.0

As an example, let’s convert Threshold 1 onto the NAEP scale. First, we multiply by 40. Then, we add 200:

<pre><code>(-0.75 x 40.0) + 200 = 170</code></pre>

This yields a new “linked” Threshold 1 of 170. The table below shows all three linked thresholds.

<table class="seda-table table table-responsive">
<thead>
<tr>
<th style="border-left-width: 2px;">Threshold</th>
<th style="border-left-width: 2px;">Original</th>
<th style="border-left-width: 2px;">Linked (on NAEP Scale)</th>
</tr>
</thead>

<tbody>
<tr>
<td style="border-left-width: 2px;">1</td>
<td>-0.75</td>
<td>170</td>
</tr>

<tr>
<td style="border-left-width: 2px;">2</td>
<td>0.05</td>
<td>202</td>
</tr>

<tr>
<td style="border-left-width: 2px;">3</td>
<td>1.0</td>
<td>240</td>
</tr>
</tbody>
</table>

We repeat this step for every state in every subject, grade, and year. The end result is a set of thresholds for every state, subject, grade, and year that are all on the same scale, the NAEP scale.
<br><br>
For more information, see Step 3 of the <a href="https://stacks.stanford.edu/file/druid:db586ns4974/seda_documentation_4.1.pdf" target="_blank" rel="noopener noreferrer">Technical Documentation</a> and Reardon, Kalogrides & Ho (2019).
