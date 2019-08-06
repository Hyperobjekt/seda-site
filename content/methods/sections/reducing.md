---
section: reducing
---
<h3>Reducing to 3 Parameters: Average, Growth, and Trend</h3>

We use hierarchical linear models to produce estimates of average performance, learning rates, and trends in average test scores. The intuition behind these models is described in this section. 

We have measures of the average test scores in up to 96 grade-year-subject cells for each school, district, or county. The scores are adjusted so that a value of 3 corresponds to the average achievement of 3rd graders nationally, a value of 4 corresponds to the average achievement of 4th graders nationally, and so on. These can be represented in a table like this (shown here for one subject for simplicity):

ADD TABLE

In this hypothetical school district, students in 3rd grade in 2009 earned an average score of 3, indicating that students scored at a third-grade level, on average (equal to the national average score for third graders). Students in eighth grade in 2016 scored at a grade 9.2 level, on average (1.2 grade levels above the national average for eighth graders).

From this table, we can compute the average test score, the average learning rate, and the average test score trend for the district. A simplified description of how we do this is provided here; for more detail, see the [SEDA technical documentation].

<h5>Computing the average test score</h5> 

To compute the average test score, we first use the information in the table to calculate how far above or below the national average students are in each grade and year: 

ADD TABLE

In this representation, students in grade 3 in 2009 have a score of 0, meaning their test scores are equal to the national average for third graders. Students in grade 8 in 2016 have a score of 1.2, meaning their scores are 1.2 grade levels above the national average for eighth graders.

We then compute the average of these differences from the national average. In this example, the average difference (the average of the cells in the table) is 0.6, meaning that the average grade 3-8 student in the district scores 0.6 grade levels above the national average.

<h5>Computing the average learning rate</h5> 

To compute the average learning rate, we compare students’ average scores in one grade and year to those in the next grade and year (see below). 

ADD TABLE

For example, we compare the average score in grade 3 in 2009 (3.0) to the average score in grade 4 in 2010 (4.2). The difference of 1.2 indicates that students’ test scores are 1.2 grade levels higher in 4th grade than they were in 3rd grade. In other words, students learning rate in that year and grade was 1.2. We compute this difference for each grade and year in the table, and then take their average. In this example, the average learning rate is also 1.2. If average test scores were at the national average in each grade and year, the average learning rate would be 1.0 (indicating that the average student’s scores improved by 1 grade level each grade). So a value of 1.2 indicates that learning rates in this district are 20% faster than the national average.

<h5>Computing the average test score trend</h5> 

To compute the average test score trend, we compare students’ average scores in one grade and year to those in the same grade in the next year (see below).

ADD TABLE

For example, we compare the average score in grade 3 in 2009 (3.0) to the average score in grade 3 in 2010 (3.1). The difference of 0.1 indicates that students’ test scores are 0.1 grade levels higher in 3rd grade in 2010 than they were in 3rd grade in 2009. We compute this difference for each grade and year in the table, and then take their average. In this example, the average test score trend 0.1 grade levels per year. 