# CS124 LAB 1 
Authors: 
[Noah Smith](https://github.com/noahsmitty) and [Kripesh Ranabhat](https://github.com/kripeshr22)

## Our Design Decisions
----
### 1. ADD TASK
For our add task, we decided on a text input component with a button next to it that reads "Add Task". We also added a placeholder that read "task description" that would provide one more hint to the user who would be looking to add a task.

### 2. NEW TASKS
For our new tasks, we would add them to the top of the list.

![](./wf1.jpeg)

### 3. EDIT/RENAME TASK
For the renaming a task, we added an edit icon (marker) next to the tasks. Some alternate designs we considered were adding an edit button on top and a save button at the bottom. Another idea we had was to add an edit button next to every task. But we decided on an icon, which would be more intuitive, more in line with the conventions and simple and better looking.

After a user clicks on the edit icon, the task description would turn into a text input component where the user has the option to rename the description. Alongside the text input would be a green checkmark icon which would be clicked on when the user is done renaming the task description. An alternate design idea we had was to just use the return/enter key to save but we decided on the green checkmark because it is more visual and thus more intuitive. 

![](./wf2.jpeg)
![](./wf3.jpeg)

### 4. SHOW ALL/DELETE ALL
For the show all uncompleted tasks and delete all completed tasks, we decided to unify them and make it consistent so that the buttons would commit an action on the same list (i.e completed tasks). Instead of show all uncompleted tasks, our interface would just hide all completed tasks and when the completed tasks are hidden there would be an option to show the hidden tasks. Initially we didn't think about the show hidden button, which would mean that hiding and deleting are doing the same thing. Alternate design ideas included having the show all uncompleted tasks and delete all above the add tasks components which we ditched in favor of performing actions on the same list/set of items. If the selected items are deleted, we also grey out the buttons.

![](./wf4.jpeg)

