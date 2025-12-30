.. meta::
   :title: Databases in PostgreSQL – What Databases (1) Means in pgAdmin
   :description: Learn what Databases (1) means in pgAdmin, how PostgreSQL databases work, and how databases store schemas and data.
   :keywords: PostgreSQL databases, Databases (1) pgAdmin, PostgreSQL database explained, pgAdmin databases
   :author: Sherullah Mohtat

postgres 
=========

**Default Database vs User Database (PostgreSQL)**

1️⃣ What is a Default Database?
-------------------------------

A **default database** is a database that PostgreSQL **creates automatically** during installation.

The most common default databases are:

+-----------------+-------------------------------+
| Database        | Purpose                       |
+=================+===============================+
| postgres        | Maintenance & admin database  |
+-----------------+-------------------------------+
| template1       | Template for new databases    |
+-----------------+-------------------------------+
| template0       | Clean, untouched template     |
+-----------------+-------------------------------+

These databases exist **before you create anything.**

============================================================================================================

2️⃣ The postgres Database (Most Important Default)
--------------------------------------------------

What is postgres?
	- A maintenance database
	- Used for:
	- Connecting to the server
	- Running admin commands
	- Creating other databases

Why it exists:
	- PostgreSQL **requires a database to connect**
	- You cannot connect to the server “without” a database

So postgres is:

    **A safe, neutral place** to connect.

============================================================================================================

**Should you store data in postgres?**

**❌ No. Never.**

Why:
	- It is meant for administration
	- Mixing app data here is bad practice
	- Many tools assume it stays clean

✔ Best practice:
	- Leave postgres empty
	- Use it only for admin tasks

3️⃣ Template Databases (template1 and template0)
------------------------------------------------

template1
	- Used when creating a new database
	- Any object inside it is **copied** to new databases

Example:
	- Extensions
	- Functions
	- Default settings

template0
	- Clean, read-only
	- Used when you want a **fresh database**
	- No customizations

Think of templates as **blueprints.**

.. note::

   📝 **Summary**

   Default databases are system-created for administration and templates, while user databases are created to store real application data.
  
