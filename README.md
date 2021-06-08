# event-management-system-web

Mazes were built with the "Randomized Depth First Search" algorithm. This algorithm is a random version of the DFS algorithm. It is one of the effective methods used in creating mazes. It is usually applied with stack. It can be applied recursive and iterative. But the thing to pay attention to in this assignment is that if we use recursive, we will 
encounter a stack overflow problem. That's why I used the iterative version of this algorithm. Now I will show the my 
own implementation.

I will apply three different search algorithms on mazes.
i) Iterative Deepening Search
ii) Uniform Cost Search
iii) A* search

For A* use the following heuristics
i) Euclidean distance
ii) Manhattan Distance

### Application Examples (100 x 100 maze and solutions)

![maze3](https://user-images.githubusercontent.com/72974967/121226047-ccb31180-c892-11eb-9741-ba7ed73c4933.png)


![maze3_solution_euclidean](https://user-images.githubusercontent.com/72974967/121226109-dd638780-c892-11eb-8abe-cfff81c79d2b.png)
![maze3_solution_ids](https://user-images.githubusercontent.com/72974967/121226115-de94b480-c892-11eb-9bbd-77f4f4f1ebbb.png)
![maze3_solution_manhattan](https://user-images.githubusercontent.com/72974967/121226120-e05e7800-c892-11eb-9920-ec52f3135e20.png)
![maze3_solution_ucs](https://user-images.githubusercontent.com/72974967/121226126-e18fa500-c892-11eb-9d7a-84ced1abfc92.png)


