---
section: challenges
weight: 1
private: true
---

### Challenges Working with Proficiency Data

While there is a substantial amount of data from every state available in ED<i>Facts</i>, there are four key challenges when using these data:

<ol>
<li>
States provide only “proficiency data”: the count of students at each 
of the proficiency levels (sometimes called “achievement levels” or 
“performance levels”). The levels represent different degrees of mastery of 
the subject-specific grade-level material. Levels are defined by score “thresholds,” 
which are set by experts in the field. Scoring above or below different 
thresholds determines placement in a specific proficiency level. 
Common levels include “below basic,” “basic,” “proficient,” and “advanced.” 
An example is shown below.
<br><br>

<table class="seda-table table table-responsive">
<thead>
<tr>
<th style="border-left-width: 2px;">Test Score</th>
<th>Proficiency Level</th>
<th>Description</th>
</tr>
</thead>

<tbody>
<tr>
<td style="border-left-width: 2px;">200-500</td>
<td>Below Basic</td>
<td>Inadequate performance; minimal mastery</td>
</tr>

<tr>
<td style="border-left-width: 2px;" >501-600</td>
<td>Basic</td>
<td>Marginal performance; partial mastery</td>
</tr>

<tr>
<td style="border-left-width: 2px;">601-700</td>
<td>Proficient</td>
<td>Satisfactory performance; adequate mastery</td>
</tr>

<tr>
<td style="border-left-width: 2px;">701-800</td>
<td>Advanced</td>
<td>Superior performance; complete mastery</td>
</tr>
</tbody>
</table>

<br>

<img src="/images/methods/scale-one-v2.svg" class="w-100" alt="Scale of test scores relative to grade level expectations, proficiency cutoff at 600" />

<br><br>
</li>

<li>
Most states use their own test and define “proficiency” in different ways, meaning that we cannot directly compare test results in one state to those in another. Proficient in one state/grade/year/subject is not comparable to proficient in another. 

<br><br>
Consider two states that use the same test, which is scored on a scale from 200 to 800 points. Each state sets its own threshold for proficiency at different scores.
<br><br>
<h5 style="color: #000;">State A: Higher threshold for proficiency</h5><br>

<img src="/images/methods/scale-one-v2.svg" class="w-100" alt="Scale of test scores relative to grade level expectations, proficiency cutoff at 600" />

<br><br>
<h5 style="color: #000;">State B: Lower threshold for proficiency</h5><br>

<img src="/images/methods/scale-two-v2.svg" class="w-100" alt="Scale of test scores relative to grade level expectations, proficiency cutoff at 500" />

<br><br>

Imagine 500 students take the test. The results are as follows: 50 students score below 400 on the exam; 100 score between 400 and 500; 200 score between 500 and 600; 50 score between 600 and 650; 50 score between 650 and 700; and 50 score above 700. If we use State A’s thresholds for assignment to categories, we find that 150 students are proficient. However, if we use State B’s thresholds, 350 students are proficient. 
<br><br>
<table class="table seda-table table-responsive" style="max-width: 500px; margin: auto;">
<thead>
<tr>
<th style="border: none;"></th>
<th colspan="2">Not Proficient</th>
<th colspan="2" style="background-color: #eff8ff;">Proficient</th>
</tr>
</thead>

<tbody>
<tr>
<td>State</td>
<td>Level 1</td>
<td>Level 2</td>
<td style="background-color: #eff8ff;">Level 3</td>
<td style="background-color: #eff8ff;">Level 4</td>
</tr>

<tr>
<td>A</td>
<td>150</td>
<td>200</td>
<td style="background-color: #e2f2fd;">100</td>
<td style="background-color: #e2f2fd;">50</td>
</tr>

<tr>
<td>B</td>
<td>50</td>
<td>100</td>
<td style="background-color: #eff8ff;">250</td>
<td style="background-color: #eff8ff;">100</td>
</tr>
</tbody>
</table>

In practice, this means that students in State B may appear to have higher “proficiency” rates than those in State A—even if their true achievement patterns are identical! Using the proficiency data without accounting for differing proficiency thresholds may lead to erroneous conclusions about the relative performance of students in different states.<br><br>
This problem is more complicated than the example suggests, because most states use different tests with material of varying difficulty and scores reported on different scales. Therefore, we cannot compare proficiency, nor can we compare students’ test scores between states.
</li>
<li>
Even within a state, different tests are used in different grade levels. This means that we cannot readily compare the performance of students in 4th grade in one year to that of students in 5th grade in the next year. Therefore, we cannot measure average learning rates across grades.
<br><br>
</li>
<li>
States may change the tests they use over time. This may result from changes in curricular standards; for example, the introduction of the Common Core State Standards led many states to adopt different tests. These changes make it hard to compare average performance in one year to that of the next. Therefore, we cannot readily measure trends in average performance over time.
<br><br>
</li>
</ol>
