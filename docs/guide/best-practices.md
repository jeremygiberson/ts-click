---
title: Suggested Best Practices
nav_order: 9
parent: Guide
---
You're free to use TS-click in any way you see fit, but here are suggestions to consider when building your CLI application.

1. **Group Related Commands**: Grouping related commands together can make your CLI more intuitive and easier to use. This can be done using the `@Group` decorator in TS Click.

2. **Use Descriptive Command Names**: Command names should be descriptive and indicate what the command does. This makes it easier for users to understand the purpose of each command.

3. **Provide Detailed Descriptions**: Use the `description` option in the `@Command`, `@Group`, `@Argument`, and `@Option` decorators to provide detailed descriptions of what each command, group, argument, and option does.

4. **Use Arguments and Options Appropriately**: Arguments should be used for required inputs, while options should be used for optional inputs. This can be done using the `@Argument` and `@Option` decorators in TS Click.

5. **Handle Errors Gracefully**: Your CLI should be able to handle errors gracefully and provide helpful error messages to the user.

6. **Keep Command Implementations Short and Simple**: Each command should have a single responsibility and its implementation should be kept as short and simple as possible. Complex commands can be broken down into smaller subcommands.

7. **Separate Command Definitions from Their Execution**: In a larger CLI application, it's a good practice to separate the command definitions from their execution. This means defining commands in one or more separate files and then importing and executing them in a separate entry file.

8. **Use a Consistent Naming Convention**: Using a consistent naming convention for commands, arguments, and options can make your CLI easier to use and understand.
