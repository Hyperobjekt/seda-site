---
section: prof-threshold
---
### Recovering the Proficiency Thresholds

We use heteroscedastic ordered probit models (aka. HETOP) to estimate the location of the thresholds that define the proficiency categories within each state, subject, grade, and year. We estimate the model using all of the counts of students in each school district within a state-subject-grade-year. 

Intuitively, we use the data form each state to determine what proportion of students are below each threshold. We then map each percentage to a score on a standard normal distribution. That set of scores are the proficiency thresholds that the state uses. <br><br>

##### Example: California, Grade 4 Reading in 2014-15

In 2014-15 a total of 463,068 students who took and received a score on the state-wide assessment. The percent of students scoring in each category is shown in the table below. These percentages correspond, roughly, to the percent of the area under the curve between each proficiency threshold.

<img src="/images/methods/distribution-table.svg" class="w-100 mt-3 mb-8">
<img src="/images/methods/distribution-chart.svg" class="w-75 mx-auto d-flex" />
<br>

