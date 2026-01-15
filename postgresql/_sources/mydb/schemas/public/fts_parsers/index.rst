|fts_parsers| FTS Parsers
==========================

.. |fts_parsers| image:: /_static/images/sidebar_icons/fts_parsers.png

--------------------
What a parser does
--------------------

Given this text:

.. code-block:: bash

    Email me at test@example.com on 2026-01-01.

The parser:
	#.	Walks through the text character by character
	#.	Splits it into tokens
	#.	Assigns each token a **type**

Example tokens:
	- Email → word
	- me → word
	- test@example.com → email
	- 2026-01-01 → date
	- . → punctuation

The parser does not:
	- Stem words
	- Remove stop-words
	- Normalize text

That’s the **dictionary’s job**, later.

================================================================================================================

-----------------------
Parser vs Dictionary
-----------------------

.. list-table::
    :header-rows: 1

    * - Component
      - Responsibility
    * - Parser
      - Splits text + labels token types
    * - Dictionary
      - Decides how each token is processed
    * - Configuration
      - Connects token types → dictionaries

================================================================================================================

--------------------------
Built-in parser: default
--------------------------

PostgreSQL ships with **one main parser** called default.

It understands:
	- Words
	- Numbers
	- URLs
	- Emails
	- Hyphenated words
	- Punctuation
	- Whitespace

In practice:
    99% of databases use the default parser unchanged

================================================================================================================

Token types produced by the parser

Some common token types:
	- word
	- numword
	- email
	- url
	- host
	- sfloat
	- version
	- hword (hyphenated word)

You can see them with:

.. code-block:: postgres 

    SELECT alias, tokid
    FROM ts_token_type('default');

================================================================================================================

------------------------------------
How parsers are used (indirectly)
------------------------------------

You never call a parser directly.

When you run:

.. code-block:: postgres 

    SELECT to_tsvector('english', 'Some sample text');

Internally:
	#.	**Parser** splits the text into tokens
	#.	**Configuration** maps token types
	#.	**Dictionaries** normalize/filter words
	#.	A tsvector is produced

================================================================================================================

---------------------------------------
Why you almost never change parsers
---------------------------------------

Parsers are:
	- Low-level
	- Hard to customize
	- Written in C (not SQL)

Most customization happens at:
	- Dictionary level
	- Configuration level

If you want different behavior:
	- Change dictionaries
	- Change token mappings

—not the parser.

================================================================================================================

------------------------------
pgAdmin: what you’re seeing
------------------------------

In **Schemas → public → FTS Parsers**, pgAdmin shows:
	- Available parsers (usually just default)
	- Their token types
	- Internal metadata

This mirrors:

.. code-block:: postgres 

    SELECT * FROM pg_ts_parser;

================================================================================================================

----------------------------------------------------
When would someone create a custom parser? (rare)
----------------------------------------------------

Only if:
	- Text is **not natural language**
	- You have custom syntax (logs, DSLs, code)
	- Tokens must be split in a non-standard way

Examples:
	- Source code search
	- Structured log formats
	- Custom markup languages

================================================================================================================

Summary:
    FTS Parsers split text into labeled pieces; dictionaries decide what those pieces mean.

