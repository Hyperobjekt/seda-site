---
section: reducing
private: true
---
<h3>The three parameters: Average test scores, learning rates, and trends in test scores</h3>

We use hierarchical linear models to produce estimates of average test scores, learning rates, and trends in average test scores. The intuition behind these models is described in this section. 
<br><br>
We have measures of the average test scores in up to 48 grade-year cells in each tested subject for each school, district, or county. The scores are adjusted so that a value of 3 corresponds to the average achievement of 3rd graders nationally, a value of 4 corresponds to the average achievement of 4th graders nationally, and so on. For each subject, these can be represented in a table like this:
<br><br>
<h5 class="big-superhead">Hypothetical Average Test Scores (Grade-level Equivalents), By Grade and Year</h5>

<table class="table-responsive table seda-table left-2 first-col-bold">
  <thead>
    <tr>
      <th>
        Grade
      </th>
      <th>
        2009
      </th>
      <th>
        2010
      </th>
      <th>
        2011
      </th>
      <th>
        2012
      </th>
      <th>
        2013
      </th>
      <th>
        2014
      </th>
      <th>
        2015
      </th>
      <th>
        2016
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>
        8
      </th>
      <td>
        8.5
      </td>
      <td>
        8.6
      </td>
      <td>
        8.7
      </td>
      <td>
        8.8
      </td>
      <td>
        8.9
      </td>
      <td>
        9.0
      </td>
      <td>
        9.1
      </td>
      <td>
        9.2
      </td>
    </tr>
    <tr>
      <th>
        7
      </th>
      <td>
        7.4
      </td>
      <td>
        7.5
      </td>
      <td>
        7.6
      </td>
      <td>
        7.7
      </td>
      <td>
        7.8
      </td>
      <td>
        7.9
      </td>
      <td>
        8.0
      </td>
      <td>
        8.1
      </td>
    </tr>
    <tr>
      <th>
        6
      </th>
      <td>
        6.3
      </td>
      <td>
        6.4
      </td>
      <td>
        6.5
      </td>
      <td>
        6.6
      </td>
      <td>
        6.7
      </td>
      <td>
        6.8
      </td>
      <td>
        6.9
      </td>
      <td>
        7.0
      </td>
    </tr>
    <tr>
      <th>
        5
      </th>
      <td>
        5.2
      </td>
      <td>
        5.3
      </td>
      <td>
        5.4
      </td>
      <td>
        5.5
      </td>
      <td>
        5.6
      </td>
      <td>
        5.7
      </td>
      <td>
        5.8
      </td>
      <td>
        5.9
      </td>
    </tr>
    <tr>
      <th>
        4
      </th>
      <td>
        4.1
      </td>
      <td>
        4.2
      </td>
      <td>
        4.3
      </td>
      <td>
        4.4
      </td>
      <td>
        4.5
      </td>
      <td>
        4.6
      </td>
      <td>
        4.7
      </td>
      <td>
        4.8
      </td>
    </tr>
    <tr>
      <th>
        3
      </th>
      <td>
        3.0
      </td>
      <td>
        3.1
      </td>
      <td>
        3.2
      </td>
      <td>
        3.3
      </td>
      <td>
        3.4
      </td>
      <td>
        3.5
      </td>
      <td>
        3.6
      </td>
      <td>
        3.7
      </td>
    </tr>
  </tbody>
</table>

In this hypothetical school district, students in 3rd grade in 2009 earned an average score of 3 in this subject, indicating that students scored at a 3rd-grade level, on average (equal to the national average for 3rd graders). Students in 8th grade in 2016 scored at a Grade 9.2 level, on average (1.2 grade levels above the national average for 8th graders).
<br><br>
From this table, we can compute the average test score, the average learning rate, and the average test score trend for the district. 
<br><br>
<h5>Computing the average test score</h5> 

To compute the average test score across grades and years, we first use the information in the table to calculate how far above or below the national average students are in each grade and year. This entails subtracting the national grade-level average—e.g., 8 in 8th grade—from the grade-year-specific score.
<br><br><br>
<h5 class="big-superhead">Hypothetical Average Test Scores (Grade-level Equivalents Relative to National Average), By Grade and Year</h5>

<table class="table-responsive table seda-table left-2 first-col-bold">
  <thead>
    <tr>
      <th>
        Grade
      </th>
      <th>
        2009
      </th>
      <th>
        2010
      </th>
      <th>
        2011
      </th>
      <th>
        2012
      </th>
      <th>
        2013
      </th>
      <th>
        2014
      </th>
      <th>
        2015
      </th>
      <th>
        2016
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>
        8
      </th>
      <td>
        0.5
      </td>
      <td>
        0.6
      </td>
      <td>
        0.7
      </td>
      <td>
        0.8
      </td>
      <td>
        0.9
      </td>
      <td>
        1.0
      </td>
      <td>
        1.1
      </td>
      <td>
        1.2
      </td>
    </tr>
    <tr>
      <th>
        7
      </th>
      <td>
        0.4
      </td>
      <td>
        0.5
      </td>
      <td>
        0.6
      </td>
      <td>
        0.7
      </td>
      <td>
        0.8
      </td>
      <td>
        0.9
      </td>
      <td>
        1.0
      </td>
      <td>
        1.1
      </td>
    </tr>
    <tr>
      <th>
        6
      </th>
      <td>
        0.3
      </td>
      <td>
        0.4
      </td>
      <td>
        0.5
      </td>
      <td>
        0.6
      </td>
      <td>
        0.7
      </td>
      <td>
        0.8
      </td>
      <td>
        0.9
      </td>
      <td>
        1.0
      </td>
    </tr>
    <tr>
      <th>
        5
      </th>
      <td>
        0.2
      </td>
      <td>
        0.3
      </td>
      <td>
        0.4
      </td>
      <td>
        0.5
      </td>
      <td>
        0.6
      </td>
      <td>
        0.7
      </td>
      <td>
        0.8
      </td>
      <td>
        0.9
      </td>
    </tr>
    <tr>
      <th>
        4
      </th>
      <td>
        0.1
      </td>
      <td>
        0.2
      </td>
      <td>
        0.3
      </td>
      <td>
        0.4
      </td>
      <td>
        0.5
      </td>
      <td>
        0.6
      </td>
      <td>
        0.7
      </td>
      <td>
        0.8
      </td>
    </tr>
    <tr>
      <th>
        3
      </th>
      <td>
        0.0
      </td>
      <td>
        0.1
      </td>
      <td>
        0.2
      </td>
      <td>
        0.3
      </td>
      <td>
        0.4
      </td>
      <td>
        0.5
      </td>
      <td>
        0.6
      </td>
      <td>
        0.7
      </td>
    </tr>
  </tbody>
</table>

In this representation, students in Grade 3 in 2009 have a score of 0, meaning their test scores are equal to the national average for 3rd graders. Students in Grade 8 in 2016 have a score of 1.2, meaning their scores are 1.2 grade levels above the national average for 8th graders.

We then compute the average of these values. In this example, the average difference (the average of the values in the table) is 0.6, meaning that the average grade 3–8 student in the district scores 0.6 grade levels above the national average.
<br><br>
<h5>Computing the average learning rate</h5> 
To compute the average learning rate, we compare students’ average scores in one grade and year to those in the next grade and year (see below). In other words, we look at grade-to-grade improvements in performance within each cohort.

<h5 class="big-superhead">Hypothetical Average Test Scores (Grade-level Equivalents), By Grade and Year</h5>

<table class="table-responsive table diag-arrow-bl left-2 seda-table">
  <thead>
    <tr>
      <th>
        Grade
      </th>
      <th>
        2009
      </th>
      <th>
        2010
      </th>
      <th>
        2011
      </th>
      <th>
        2012
      </th>
      <th>
        2013
      </th>
      <th>
        2014
      </th>
      <th>
        2015
      </th>
      <th>
        2016
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>
        8
      </th>
      <td>
        8.5
      </td>
      <td>
        8.6
      </td>
      <td>
        8.7
      </td>
      <td>
        8.8
      </td>
      <td>
        8.9
      </td>
      <td>
        9.0
      </td>
      <td>
        9.1
      </td>
      <td>
        9.2
      </td>
    </tr>
    <tr>
      <th>
        7
      </th>
      <td>
        7.4
      </td>
      <td>
        7.5
      </td>
      <td>
        7.6
      </td>
      <td>
        7.7
      </td>
      <td>
        7.8
      </td>
      <td>
        7.9
      </td>
      <td>
        8.0
      </td>
      <td>
        8.1
      </td>
    </tr>
    <tr>
      <th>
        6
      </th>
      <td>
        6.3
      </td>
      <td>
        6.4
      </td>
      <td>
        6.5
      </td>
      <td>
        6.6
      </td>
      <td>
        6.7
      </td>
      <td>
        6.8
      </td>
      <td>
        6.9
      </td>
      <td>
        7.0
      </td>
    </tr>
    <tr>
      <th>
        5
      </th>
      <td>
        5.2
      </td>
      <td>
        5.3
      </td>
      <td>
        5.4
      </td>
      <td>
        5.5
      </td>
      <td>
        5.6
      </td>
      <td>
        5.7
      </td>
      <td>
        5.8
      </td>
      <td>
        5.9
      </td>
    </tr>
    <tr>
      <th>
        4
      </th>
      <td>
        4.1
      </td>
      <td>
        4.2
      </td>
      <td>
        4.3
      </td>
      <td>
        4.4
      </td>
      <td>
        4.5
      </td>
      <td>
        4.6
      </td>
      <td>
        4.7
      </td>
      <td>
        4.8
      </td>
    </tr>
    <tr>
      <th>
        3
      </th>
      <td>
        3.0
      </td>
      <td>
        3.1
      </td>
      <td>
        3.2
      </td>
      <td>
        3.3
      </td>
      <td>
        3.4
      </td>
      <td>
        3.5
      </td>
      <td>
        3.6
      </td>
      <td>
        3.7
      </td>
    </tr>
  </tbody>
</table>

For example, we compare the average score in Grade 3 in 2009 (3.0) to the average score in Grade 4 in 2010 (4.2). The difference of 1.2 indicates that students’ test scores are 1.2 grade levels higher in 4th grade than they were in 3rd grade, or that students’ learning rate in that year and grade was 1.2. We compute this difference for each diagonal pair of cells in the table, and then take their average. In this table, the average learning rate is also 1.2. If average test scores were at the national average in each grade and year, the average learning rate would be 1.0 (indicating that the average student’s scores improved by one grade level each grade). So, a value of 1.2 indicates that learning rates in this district are 20% faster than the national average. 
<br><br>
<h5>Computing the trend in average test scores</h5> 

To compute the average test score trend, we compare students’ average scores in one grade and year to those in the same grade in the next year (see below). In other words, we look at year-to-year improvements in performance within each grade.

<table class="table-responsive table rt-arrow-bl left-2 seda-table">
  <thead>
    <tr>
      <th>
        Grade
      </th>
      <th>
        2009
      </th>
      <th>
        2010
      </th>
      <th>
        2011
      </th>
      <th>
        2012
      </th>
      <th>
        2013
      </th>
      <th>
        2014
      </th>
      <th>
        2015
      </th>
      <th>
        2016
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>
        8
      </th>
      <td>
        8.5
      </td>
      <td>
        8.6
      </td>
      <td>
        8.7
      </td>
      <td>
        8.8
      </td>
      <td>
        8.9
      </td>
      <td>
        9.0
      </td>
      <td>
        9.1
      </td>
      <td>
        9.2
      </td>
    </tr>
    <tr>
      <th>
        7
      </th>
      <td>
        7.4
      </td>
      <td>
        7.5
      </td>
      <td>
        7.6
      </td>
      <td>
        7.7
      </td>
      <td>
        7.8
      </td>
      <td>
        7.9
      </td>
      <td>
        8.0
      </td>
      <td>
        8.1
      </td>
    </tr>
    <tr>
      <th>
        6
      </th>
      <td>
        6.3
      </td>
      <td>
        6.4
      </td>
      <td>
        6.5
      </td>
      <td>
        6.6
      </td>
      <td>
        6.7
      </td>
      <td>
        6.8
      </td>
      <td>
        6.9
      </td>
      <td>
        7.0
      </td>
    </tr>
    <tr>
      <th>
        5
      </th>
      <td>
        5.2
      </td>
      <td>
        5.3
      </td>
      <td>
        5.4
      </td>
      <td>
        5.5
      </td>
      <td>
        5.6
      </td>
      <td>
        5.7
      </td>
      <td>
        5.8
      </td>
      <td>
        5.9
      </td>
    </tr>
    <tr>
      <th>
        4
      </th>
      <td>
        4.1
      </td>
      <td>
        4.2
      </td>
      <td>
        4.3
      </td>
      <td>
        4.4
      </td>
      <td>
        4.5
      </td>
      <td>
        4.6
      </td>
      <td>
        4.7
      </td>
      <td>
        4.8
      </td>
    </tr>
    <tr>
      <th>
        3
      </th>
      <td>
        3.0
      </td>
      <td>
        3.1
      </td>
      <td>
        3.2
      </td>
      <td>
        3.3
      </td>
      <td>
        3.4
      </td>
      <td>
        3.5
      </td>
      <td>
        3.6
      </td>
      <td>
        3.7
      </td>
    </tr>
  </tbody>
</table>

For example, we compare the average score in Grade 3 in 2009 (3.0) to the average score in Grade 3 in 2010 (3.1). The difference of 0.1 indicates that students’ test scores are 0.1 grade levels higher in 3rd grade in 2010 than they were in 3rd grade in 2009. We compute this difference for each horizontal pair of cells in the table, and then take their average. In this example, the average test score trend is 0.1 grade levels per year. 

For technical details, see Step 9 of the <a href="/papers/SEDA_documentation_v30_DRAFT09212019.pdf" target="_blank">technical documentation</a>.