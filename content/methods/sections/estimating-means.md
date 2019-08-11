---
section: estimating-means
---
<h3>Estimating Means from Proficiency Count Data</h3>

The next step of our process is to estimate the mean test score in each school and district for all students and by student subgroups (gender, race/ethnicity, and economic disadvantage). TO do this, we estimate heteroscedastic ordered probit models using both the raw proficiency count data (shown above) and the linked thresholds from the prior step. Under a set of assumptions (described in the technical documentation), this method allows us to recover unbiased and precise estimates of the mean standardized test score in a school or district for every subgroup, subject, grade and year. 
<br><br>
<h5>How do we know this worked?</h5>

- <span class="highlight">Cite Reardon et al (JEBS) and Shear and Reardon (working paper). Show HETOP validation something or other.</span>

To get estimates for each county (in a given subject, grade, and year) we take a weighted average of all the estimates from the districts that belong to that county. The weighted average accounts for the number of students served in each district, allowing estimates from large districts in a county to contribute more than small districts.
Importantly, because we scaled the thresholds to a common scale, all of the recovered estimates are on a common scale, the NAEP scale.
