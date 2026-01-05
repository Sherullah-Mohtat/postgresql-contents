.. meta::
   :title: Login and Group Roles in PostgreSQL – Users & Permissions Explained
   :description: Learn what Login / Group Roles mean in pgAdmin, why PostgreSQL shows Roles (12), and how roles manage users and permissions.
   :keywords: PostgreSQL roles, login roles, group roles, pgAdmin users, PostgreSQL permissions
   :author: Sherullah Mohtat

Login/Group Roles(12)
======================

In pgAdmin, **Login / Group Roles (12)** means:

PostgreSQL currently has **12 roles (users & groups)** defined on this server.

The number **(12)** is simply a **count**, just like:
	- Servers (1)
	- Databases (2)
	- Tablespaces (2)

What is a Role in PostgreSQL?
------------------------------

In PostgreSQL, a role is a unified concept that can act as:
	- 👤 User (Login Role)
	- 👥 Group (Role without login)

PostgreSQL **does not separate users and groups** like some databases — everything is a role.

========================================================================================================================

**What pgAdmin shows under Login / Group Roles**

**pgAdmin** lists roles like **System-defined roles (built-in)**

These are created automatically by PostgreSQL:
	- pg_database_owner
	- pg_execute_server_program
	- pg_monitor
	- pg_read_all_data
	- pg_read_all_settings
	- pg_read_all_stats
	- pg_read_server_files
	- pg_signal_backend
	- pg_stat_scan_tables
	- pg_write_all_data
	- pg_write_server_files

These roles are **for internal permissions** and **advanced administration.**

=================================================================================================

**User-defined role**

Example from your screenshot:
	- sherullahmohtat

This is a **login role**, meaning:
	- ✅ Can log in
	- ✅ Can own databases
	- ✅ Can create roles / data (depending on permissions)

**🔑 Login Role vs Group Role**

+---------------+----------------+-------------------------------+
| Type          | Login?         | Purpose                       |
+===============+================+===============================+
| Login Role    | ✅ Yes         | Used to connect to PostgreSQL |
+---------------+----------------+-------------------------------+
| Group Role    | ❌ No          | Used to group permissions     |
+---------------+----------------+-------------------------------+

**Example**

.. code-block:: bash 

   Role: app_user        → LOGIN
   Role: app_readonly   → NOLOGIN

You then **grant the group role to the user.**

==============================================================================================

**Why PostgreSQL uses Roles instead of Users + Groups**

PostgreSQL roles allow:
	- Flexible permission management
	- Role inheritance
	- Secure access control
	- Enterprise-grade security

One role can:
	- Log in
	- Own objects
	- Grant permissions
	- Belong to other roles

**How pgAdmin represents roles visually**

In pgAdmin:
	- 👤 Icon → Login role
	- 👥 Icon → Group role
	- 🔒 Toggles show permissions like:

      - Can login?
      - Superuser?
      - Create roles?
      - Create databases?

These switches map directly to PostgreSQL role attributes.

**Why the number shows (12)**

.. code-block:: bash 

   Login / Group Roles (12)

Means:
	- Total roles defined on the server = 12
	- Includes:

      - System roles
      - Custom roles
      - Login + non-login roles

.. note:: 

   📝 One-line summary

   Login / Group Roles represent PostgreSQL users and permission groups that control who can connect, what they can access, and what actions they are allowed to perform.




  
.. toctree::
   :hidden:
   :maxdepth: 2
   
   pg_database_owner.rst
   pg_execute_server_program.rst
   pg_monitor.rst
   pg_read_all_data.rst
   pg_read_all_settings.rst
   pg_read_all_stats.rst
   pg_read_server_files.rst
   pg_signal_backend.rst
   pg_stat_scan_tables.rst
   pg_write_all_data.rst 
   pg_write_server_files.rst
   sherullahmohtat.rst

