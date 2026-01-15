|fts_dictionaries| FTS Dictionaries 
====================================

.. |fts_dictionaries| image:: /_static/images/sidebar_icons/fts_dictionaries.png

-----------------------------
What is an FTS Dictionary?
-----------------------------

An **FTS dictionary** is the component that **processes each token** (word-like piece) after the text is split by the parser.
Its job is to decide **what to keep, how to normalize it**, or **whether to drop it.**

In short:
	- Parser → splits text
	- **Dictionary → understands words**
	- Configuration → connects everything

============================================================================================================================================

----------------------------------
What a dictionary actually does
----------------------------------

For every token it receives, a dictionary can:

    #.	Normalize:
        - Lowercase
        - Remove punctuation
        - Convert variants to a base form

    #.	Reduce:
	    - Convert related forms to one base form (stemming)

    #.	Filter:
        - Drop stop-words (the, is, and, etc.)
        - Drop tokens it doesn’t recognize

    #.	Accept as-is:
	    - Keep the word unchanged

============================================================================================================================================

-----------------------------------
Common built-in dictionary types
-----------------------------------

1️⃣ simple (most important to understand)
	- Keeps words **as they are**
	- No stemming
	- No stop-words
	- Just lowercases

.. code-block:: postgres 

    SELECT to_tsvector('simple', 'Running runs runner');
    -- 'running' 'runs' 'runner'

Use when:
	- Exact words matter
	- You don’t want linguistic changes

============================================================================================================================================

2️⃣ Language stem dictionaries (e.g., english_stem)
	- Converts words to a root form
	- Removes common stop-words

.. code-block:: postgres 

    SELECT to_tsvector('english', 'running runs runner');
    -- 'run'

Use when:
	- You want conceptual matching
	- “run”, “running”, “runs” should match

============================================================================================================================================

3️⃣ synonym dictionary
	- Maps words to **equivalent terms**

Example synonym file:

.. code-block:: bash 

    dbms database
    pgsql postgresql

Result:
	- Searching for database also matches dbms

Used for:
	- Aliases
	- Abbreviations
	- Product names

============================================================================================================================================

4️⃣ thesaurus dictionary
	- More advanced synonyms
	- Supports phrases
	- Can expand terms into multiple tokens

Used for:
	- Advanced search UX
	- Domain-specific vocabulary

============================================================================================================================================

5️⃣ ispell dictionary
	- Morphological analysis
	- External dictionary + affix rules

Used when:
	- You need fine-grained linguistic control
	- You have custom dictionary files

============================================================================================================================================

----------------------------
How dictionaries are wired
----------------------------

Dictionaries **never work alone.**

They are used **by a configuration,** mapped per token type.

Example mapping:

.. code-block:: bash 

    word → english_stem
    numword → simple
    email → simple
    url → simple

That mapping lives inside the **FTS Configuration.**

============================================================================================================================================

---------------------------
Seeing dictionaries in SQL
---------------------------

List dictionaries

.. code-block:: postgres 

    SELECT dictname, dicttemplate
    FROM pg_ts_dict;

.. code-block:: postgres 

    SELECT *
    FROM pg_ts_dict
    WHERE dictname = 'english_stem';

============================================================================================================================================

**Using a dictionary indirectly (real life)**

You **don’t call dictionaries directly.**

You use them through:

.. code-block:: postgres 

    to_tsvector('english', text)
    to_tsquery('english', query)

The configuration decides which dictionary is used.

============================================================================================================================================

-----------------------------
Typical real-world setups
-----------------------------

Exact-match search
	- Dictionary: simple
	- No stemming
	- Predictable behavior

Natural language search
	- Dictionary: english_stem
	- Better recall
	- Slightly less precision

Mixed content (IDs, emails, text)
	- simple for structured tokens
	- english_stem for words

============================================================================================================================================

--------------
pgAdmin view 
--------------

In **Schemas → public → FTS Dictionaries**, pgAdmin shows:
	- Dictionary name
	- Template (simple, ispell, synonym, etc.)
	- Options

It’s just a visual layer over:
	- pg_ts_dict
	- pg_ts_template

============================================================================================================================================

Summary:
    FTS Dictionaries decide what a “word” means, how it is normalized, and whether it is searchable at all.







