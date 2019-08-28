---
section: estimating-means
---
<h3>Estimating Means from Proficiency Count Data</h3>

The next step of our process is to estimate the mean test score in each school and district for all students and by student subgroups (gender, race/ethnicity, and economic disadvantage). To do this, we estimate heteroskedastic ordered probit models using both the raw proficiency count data (shown above) and the linked thresholds from the prior step. This method (described in the technical documentation) allows us to estimate the mean standardized test score in a school or district for every subgroup, subject, grade and year on the same scale. 

To get estimates for each county (in a given subject, grade, and year) we take a weighted average of all the estimates from the districts that belong to that county. The weighted average accounts for the number of students served in each district, allowing estimates from large districts in a county to contribute more than small districts.
