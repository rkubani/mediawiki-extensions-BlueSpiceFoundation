<?php
/**
 * Hook handler base class for BlueSpice hook BSEntityRegister
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 *
 * This file is part of BlueSpice MediaWiki
 * For further information visit http://bluespice.com
 *
 * @author     Patric Wirth <wirth@hallowelt.com>
 * @package    BlueSpiceFoundation
 * @copyright  Copyright (C) 2017 Hallo Welt! GmbH, All rights reserved.
 * @license    http://www.gnu.org/copyleft/gpl.html GNU Public License v2 or later
 * @filesource
 */
namespace BlueSpice\Hook;
use BlueSpice\Hook;

abstract class BSEntityRegister extends Hook {
	/**
	 * An array of entity registrations
	 * [ entitykey => EntityConfig class name ].
	 * @var array
	 */
	protected $entityRegistrations = null;

	/**
	 * Located in \BlueSpice\EntityRegistry::runRegister. Collects all entity
	 * configs and instantiates them.
	 * @param array $entityRegistrations
	 * @return boolean
	 */
	public static function callback( &$entityRegistrations ) {
		$className = static::class;
		$hookHandler = new $className(
			null,
			null,
			$entityRegistrations
		);
		return $hookHandler->process();
	}

	/**
	 * @param \IContextSource $context
	 * @param \Config $config
	 * @param array $entityRegistrations
	 */
	public function __construct( $context, $config, &$entityRegistrations ) {
		parent::__construct( $context, $config );

		$this->entityRegistrations = &$entityRegistrations;
	}
}