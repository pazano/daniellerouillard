<?php
/**
 * Part of Windwalker project.
 *
 * @copyright  Copyright (C) 2014 - 2015 LYRASOFT. All rights reserved.
 * @license    GNU Lesser General Public License version 3 or later.
 */

namespace Windwalker\Registry\Format;

/**
 * XML format handler for Registry.
 *
 * @since  2.0
 */
class XmlFormat implements FormatInterface
{
	/**
	 * Converts an object into an XML formatted string.
	 * -    If more than two levels of nested groups are necessary, since INI is not
	 * useful, XML or another format should be used.
	 *
	 * @param   object  $struct   Data source object.
	 * @param   array   $options  Options used by the formatter.
	 *
	 * @return  string  XML formatted string.
	 *
	 * @since   2.0
	 */
	public static function structToString($struct, array $options = array())
	{
		$rootName = (isset($options['name'])) ? $options['name'] : 'registry';
		$nodeName = (isset($options['nodeName'])) ? $options['nodeName'] : 'node';

		// Create the root node.
		$root = simplexml_load_string('<' . $rootName . ' />');

		// Iterate over the object members.
		static::getXmlChildren($root, $struct, $nodeName);

		return $root->asXML();
	}

	/**
	 * Parse a XML formatted string and convert it into an object.
	 *
	 * @param   string  $data     XML formatted string to convert.
	 * @param   array   $options  Options used by the formatter.
	 *
	 * @return  object   Data object.
	 *
	 * @since   2.0
	 */
	public static function stringToStruct($data, array $options = array())
	{
		$obj = new \stdClass;

		// Parse the XML string.
		$xml = simplexml_load_string($data);

		foreach ($xml->children() as $node)
		{
			$obj->{$node['name']} = static::getValueFromNode($node);
		}

		return $obj;
	}

	/**
	 * Method to get a PHP native value for a SimpleXMLElement object. -- called recursively
	 *
	 * @param   object  $node  SimpleXMLElement object for which to get the native value.
	 *
	 * @return  mixed  Native value of the SimpleXMLElement object.
	 */
	protected static function getValueFromNode($node)
	{
		switch ($node['type'])
		{
			case 'integer':
				$value = (string) $node;

				return (int) $value;
				break;

			case 'string':
				return (string) $node;
				break;

			case 'boolean':
				$value = (string) $node;

				return (bool) $value;
				break;

			case 'double':
				$value = (string) $node;

				return (float) $value;
				break;

			case 'array':
				$value = array();

				foreach ($node->children() as $child)
				{
					$value[(string) $child['name']] = static::getValueFromNode($child);
				}

				break;

			default:
				$value = new \stdClass;

				foreach ($node->children() as $child)
				{
					$e = $child['name'];

					$value->$e = static::getValueFromNode($child);
				}

				break;
		}

		return $value;
	}

	/**
	 * Method to build a level of the XML string -- called recursively
	 *
	 * @param   \SimpleXMLElement  $node      SimpleXMLElement object to attach children.
	 * @param   object             $var       Object that represents a node of the XML document.
	 * @param   string             $nodeName  The name to use for node elements.
	 *
	 * @return  void
	 */
	protected static function getXmlChildren(\SimpleXMLElement $node, $var, $nodeName)
	{
		// Iterate over the object members.
		foreach ((array) $var as $k => $v)
		{
			if (is_scalar($v))
			{
				$n = $node->addChild($nodeName, $v);
				$n->addAttribute('name', $k);
				$n->addAttribute('type', gettype($v));
			}
			else
			{
				$n = $node->addChild($nodeName);
				$n->addAttribute('name', $k);
				$n->addAttribute('type', gettype($v));

				static::getXmlChildren($n, $v, $nodeName);
			}
		}
	}
}
