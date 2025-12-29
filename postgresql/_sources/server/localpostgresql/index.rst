.. meta::
   :title: Local PostgreSQL – What It Means in pgAdmin
   :description: Learn what Local PostgreSQL means in pgAdmin, how local PostgreSQL works, and how it differs from remote PostgreSQL servers.
   :keywords: Local PostgreSQL, pgAdmin Local PostgreSQL, PostgreSQL localhost, PostgreSQL local server
   :author: Sherullah Mohtat

Local PostgreSQL
=================

Local PostgreSQL refers to a PostgreSQL server instance running on the same
machine as pgAdmin. It allows developers to manage databases locally using
a PostgreSQL service that listens on localhost without requiring a network connection.

What is Local PostgreSQL?
---------------------------

**Local PostgreSQL** means that the PostgreSQL server is running on the same machine where you are using pgAdmin.

In case:
	- pgAdmin ✔
	- PostgreSQL ✔

both are running on **your laptop.**

**What “local” actually means**

“Local” does NOT mean:
	- Simple
	- Limited
	- Only for learning

“Local” means:
	- Host: localhost or 127.0.0.1
	- PostgreSQL runs as a **local system service**
	- Connections stay **inside your computer**

Technically:
	- No internet required
	- No remote network involved

**How pgAdmin sees “Local PostgreSQL”**

In pgAdmin’s Object Explorer:

.. code-block:: bash 

   Servers (1)
   └── Local PostgreSQL

This tells us:
	- PostgreSQL is installed locally
	- pgAdmin is connected to it
	- The server name is just a **label** (“Local PostgreSQL”)

The name can be changed — it’s not special.

=======================================================================================

What is running behind “Local PostgreSQL”?
--------------------------------------------

When you install PostgreSQL locally:
	- A background process starts (the PostgreSQL server)
	- It listens on a port (usually 5432)
	- It manages:
	- Databases
	- Users (roles)
	- Permissions
	- Connections

Even locally, PostgreSQL behaves like a **real server.**

**Example (technical view)**

.. code-block:: bash 

   Host: localhost
   Port: 5432
   User: sherullahmohtat
   Service: PostgreSQL

This is exactly the same setup used in:
	- Production servers
	- Cloud databases
	- Remote machines

Only the **location** changes.

Local vs Remote PostgreSQL
---------------------------

+-----------------------+------------------------------+------------------------+
| Feature               | Local PostgreSQL             | Remote PostgreSQL      |
+=======================+==============================+========================+
| Runs on               | Your computer                | Another machine        | 
+-----------------------+------------------------------+------------------------+
| Internet required     | ❌ No                        | ✅ Yes                 |
+-----------------------+------------------------------+------------------------+
| Speed                 | Very fast                    | Network dependent      |
+-----------------------+------------------------------+------------------------+
| Use case              | Development, learning        | Production             |
+-----------------------+------------------------------+------------------------+

.. note::

   📝 **One-line summary**

   Local PostgreSQL means PostgreSQL is running on your own computer and is
   accessed through localhost.




.. toctree::
   :maxdepth: 4
  
   databases/index
   logingrouproles/index
   tablespaces/index 


   