---
section: prof-threshold
private: true
---
### Estimating the location of each state’s proficiency thresholds

We use a statistical technique called heteroskedastic ordered probit modeling (HETOP) to estimate the location of the thresholds that define the proficiency categories within each state, subject, grade, and year. We estimate the model using all the counts of students in each **school district** within a state-subject-grade-year. 

A simplified description of this method follows. We assume the distribution of test scores in each school district is bell-shaped. For each state, grade, year, and subject, we then find the set of test-score thresholds that meet two conditions: 1) they would most closely produce the reported proportions of students in each proficiency category; and 2) they represent a test-score scale in which the average student in the state-grade-year-subject has a score of 0 and the standard deviation of scores is 1.  <br><br>

##### Example: State A, Grade 4 reading in 2014–15

<span id="state_a_grade_4_reading">In the example below, there are three districts in State A. The table shows the number and proportion of scores in each of the state’s four proficiency categories. District 1 has more lower-scoring students than the others; District 3 has more higher-scoring students. We assume each district’s test-score distribution is bell-shaped. We then determine where the three thresholds would be located that would yield the proportions of students in each district shown in the table.  </span><span id="state_a_grade_4_reading_chart">In this example, the top threshold is one standard deviation above the statewide average score; at this value, we would expect no students from District 1 to score in the top proficiency category, and would expect 20% of those in District 3 to score in the top category.</span>


<img src="/images/methods/distribution-table-v2.svg" class="w-100 mt-3 mb-8" alt="Distribution table" aria-describedby="state_a_grade_4_reading">
<img src="/images/methods/distribution-chart-v2.svg" class="w-75 mx-auto d-flex" alt="Distribution chart" aria-describedby="state_a_grade_4_reading_chart" />
<br>
