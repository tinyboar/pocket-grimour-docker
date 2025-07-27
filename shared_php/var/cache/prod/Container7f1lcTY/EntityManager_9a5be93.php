<?php

namespace Container7f1lcTY;

class EntityManager_9a5be93 extends \Doctrine\ORM\EntityManager implements \ProxyManager\Proxy\VirtualProxyInterface
{
    private $valueHolderba8a2 = null;
    private $initializerb791b = null;
    private static $publicProperties44749 = [
        
    ];
    public function getConnection()
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'getConnection', array(), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->getConnection();
    }
    public function getMetadataFactory()
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'getMetadataFactory', array(), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->getMetadataFactory();
    }
    public function getExpressionBuilder()
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'getExpressionBuilder', array(), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->getExpressionBuilder();
    }
    public function beginTransaction()
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'beginTransaction', array(), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->beginTransaction();
    }
    public function getCache()
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'getCache', array(), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->getCache();
    }
    public function transactional($func)
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'transactional', array('func' => $func), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->transactional($func);
    }
    public function wrapInTransaction(callable $func)
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'wrapInTransaction', array('func' => $func), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->wrapInTransaction($func);
    }
    public function commit()
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'commit', array(), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->commit();
    }
    public function rollback()
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'rollback', array(), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->rollback();
    }
    public function getClassMetadata($className)
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'getClassMetadata', array('className' => $className), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->getClassMetadata($className);
    }
    public function createQuery($dql = '')
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'createQuery', array('dql' => $dql), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->createQuery($dql);
    }
    public function createNamedQuery($name)
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'createNamedQuery', array('name' => $name), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->createNamedQuery($name);
    }
    public function createNativeQuery($sql, \Doctrine\ORM\Query\ResultSetMapping $rsm)
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'createNativeQuery', array('sql' => $sql, 'rsm' => $rsm), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->createNativeQuery($sql, $rsm);
    }
    public function createNamedNativeQuery($name)
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'createNamedNativeQuery', array('name' => $name), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->createNamedNativeQuery($name);
    }
    public function createQueryBuilder()
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'createQueryBuilder', array(), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->createQueryBuilder();
    }
    public function flush($entity = null)
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'flush', array('entity' => $entity), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->flush($entity);
    }
    public function find($className, $id, $lockMode = null, $lockVersion = null)
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'find', array('className' => $className, 'id' => $id, 'lockMode' => $lockMode, 'lockVersion' => $lockVersion), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->find($className, $id, $lockMode, $lockVersion);
    }
    public function getReference($entityName, $id)
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'getReference', array('entityName' => $entityName, 'id' => $id), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->getReference($entityName, $id);
    }
    public function getPartialReference($entityName, $identifier)
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'getPartialReference', array('entityName' => $entityName, 'identifier' => $identifier), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->getPartialReference($entityName, $identifier);
    }
    public function clear($entityName = null)
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'clear', array('entityName' => $entityName), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->clear($entityName);
    }
    public function close()
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'close', array(), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->close();
    }
    public function persist($entity)
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'persist', array('entity' => $entity), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->persist($entity);
    }
    public function remove($entity)
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'remove', array('entity' => $entity), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->remove($entity);
    }
    public function refresh($entity, ?int $lockMode = null)
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'refresh', array('entity' => $entity, 'lockMode' => $lockMode), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->refresh($entity, $lockMode);
    }
    public function detach($entity)
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'detach', array('entity' => $entity), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->detach($entity);
    }
    public function merge($entity)
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'merge', array('entity' => $entity), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->merge($entity);
    }
    public function copy($entity, $deep = false)
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'copy', array('entity' => $entity, 'deep' => $deep), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->copy($entity, $deep);
    }
    public function lock($entity, $lockMode, $lockVersion = null)
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'lock', array('entity' => $entity, 'lockMode' => $lockMode, 'lockVersion' => $lockVersion), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->lock($entity, $lockMode, $lockVersion);
    }
    public function getRepository($entityName)
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'getRepository', array('entityName' => $entityName), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->getRepository($entityName);
    }
    public function contains($entity)
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'contains', array('entity' => $entity), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->contains($entity);
    }
    public function getEventManager()
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'getEventManager', array(), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->getEventManager();
    }
    public function getConfiguration()
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'getConfiguration', array(), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->getConfiguration();
    }
    public function isOpen()
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'isOpen', array(), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->isOpen();
    }
    public function getUnitOfWork()
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'getUnitOfWork', array(), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->getUnitOfWork();
    }
    public function getHydrator($hydrationMode)
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'getHydrator', array('hydrationMode' => $hydrationMode), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->getHydrator($hydrationMode);
    }
    public function newHydrator($hydrationMode)
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'newHydrator', array('hydrationMode' => $hydrationMode), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->newHydrator($hydrationMode);
    }
    public function getProxyFactory()
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'getProxyFactory', array(), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->getProxyFactory();
    }
    public function initializeObject($obj)
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'initializeObject', array('obj' => $obj), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->initializeObject($obj);
    }
    public function isUninitializedObject($obj) : bool
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'isUninitializedObject', array('obj' => $obj), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->isUninitializedObject($obj);
    }
    public function getFilters()
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'getFilters', array(), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->getFilters();
    }
    public function isFiltersStateClean()
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'isFiltersStateClean', array(), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->isFiltersStateClean();
    }
    public function hasFilters()
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'hasFilters', array(), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return $this->valueHolderba8a2->hasFilters();
    }
    public static function staticProxyConstructor($initializer)
    {
        static $reflection;
        $reflection = $reflection ?? new \ReflectionClass(__CLASS__);
        $instance   = $reflection->newInstanceWithoutConstructor();
        \Closure::bind(function (\Doctrine\ORM\EntityManager $instance) {
            unset($instance->config, $instance->conn, $instance->metadataFactory, $instance->unitOfWork, $instance->eventManager, $instance->proxyFactory, $instance->repositoryFactory, $instance->expressionBuilder, $instance->closed, $instance->filterCollection, $instance->cache);
        }, $instance, 'Doctrine\\ORM\\EntityManager')->__invoke($instance);
        $instance->initializerb791b = $initializer;
        return $instance;
    }
    public function __construct(\Doctrine\DBAL\Connection $conn, \Doctrine\ORM\Configuration $config, ?\Doctrine\Common\EventManager $eventManager = null)
    {
        static $reflection;
        if (! $this->valueHolderba8a2) {
            $reflection = $reflection ?? new \ReflectionClass('Doctrine\\ORM\\EntityManager');
            $this->valueHolderba8a2 = $reflection->newInstanceWithoutConstructor();
        \Closure::bind(function (\Doctrine\ORM\EntityManager $instance) {
            unset($instance->config, $instance->conn, $instance->metadataFactory, $instance->unitOfWork, $instance->eventManager, $instance->proxyFactory, $instance->repositoryFactory, $instance->expressionBuilder, $instance->closed, $instance->filterCollection, $instance->cache);
        }, $this, 'Doctrine\\ORM\\EntityManager')->__invoke($this);
        }
        $this->valueHolderba8a2->__construct($conn, $config, $eventManager);
    }
    public function & __get($name)
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, '__get', ['name' => $name], $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        if (isset(self::$publicProperties44749[$name])) {
            return $this->valueHolderba8a2->$name;
        }
        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');
        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolderba8a2;
            $backtrace = debug_backtrace(false, 1);
            trigger_error(
                sprintf(
                    'Undefined property: %s::$%s in %s on line %s',
                    $realInstanceReflection->getName(),
                    $name,
                    $backtrace[0]['file'],
                    $backtrace[0]['line']
                ),
                \E_USER_NOTICE
            );
            return $targetObject->$name;
        }
        $targetObject = $this->valueHolderba8a2;
        $accessor = function & () use ($targetObject, $name) {
            return $targetObject->$name;
        };
        $backtrace = debug_backtrace(true, 2);
        $scopeObject = isset($backtrace[1]['object']) ? $backtrace[1]['object'] : new \ProxyManager\Stub\EmptyClassStub();
        $accessor = $accessor->bindTo($scopeObject, get_class($scopeObject));
        $returnValue = & $accessor();
        return $returnValue;
    }
    public function __set($name, $value)
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, '__set', array('name' => $name, 'value' => $value), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');
        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolderba8a2;
            $targetObject->$name = $value;
            return $targetObject->$name;
        }
        $targetObject = $this->valueHolderba8a2;
        $accessor = function & () use ($targetObject, $name, $value) {
            $targetObject->$name = $value;
            return $targetObject->$name;
        };
        $backtrace = debug_backtrace(true, 2);
        $scopeObject = isset($backtrace[1]['object']) ? $backtrace[1]['object'] : new \ProxyManager\Stub\EmptyClassStub();
        $accessor = $accessor->bindTo($scopeObject, get_class($scopeObject));
        $returnValue = & $accessor();
        return $returnValue;
    }
    public function __isset($name)
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, '__isset', array('name' => $name), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');
        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolderba8a2;
            return isset($targetObject->$name);
        }
        $targetObject = $this->valueHolderba8a2;
        $accessor = function () use ($targetObject, $name) {
            return isset($targetObject->$name);
        };
        $backtrace = debug_backtrace(true, 2);
        $scopeObject = isset($backtrace[1]['object']) ? $backtrace[1]['object'] : new \ProxyManager\Stub\EmptyClassStub();
        $accessor = $accessor->bindTo($scopeObject, get_class($scopeObject));
        $returnValue = $accessor();
        return $returnValue;
    }
    public function __unset($name)
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, '__unset', array('name' => $name), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');
        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolderba8a2;
            unset($targetObject->$name);
            return;
        }
        $targetObject = $this->valueHolderba8a2;
        $accessor = function () use ($targetObject, $name) {
            unset($targetObject->$name);
            return;
        };
        $backtrace = debug_backtrace(true, 2);
        $scopeObject = isset($backtrace[1]['object']) ? $backtrace[1]['object'] : new \ProxyManager\Stub\EmptyClassStub();
        $accessor = $accessor->bindTo($scopeObject, get_class($scopeObject));
        $accessor();
    }
    public function __clone()
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, '__clone', array(), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        $this->valueHolderba8a2 = clone $this->valueHolderba8a2;
    }
    public function __sleep()
    {
        $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, '__sleep', array(), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
        return array('valueHolderba8a2');
    }
    public function __wakeup()
    {
        \Closure::bind(function (\Doctrine\ORM\EntityManager $instance) {
            unset($instance->config, $instance->conn, $instance->metadataFactory, $instance->unitOfWork, $instance->eventManager, $instance->proxyFactory, $instance->repositoryFactory, $instance->expressionBuilder, $instance->closed, $instance->filterCollection, $instance->cache);
        }, $this, 'Doctrine\\ORM\\EntityManager')->__invoke($this);
    }
    public function setProxyInitializer(?\Closure $initializer = null) : void
    {
        $this->initializerb791b = $initializer;
    }
    public function getProxyInitializer() : ?\Closure
    {
        return $this->initializerb791b;
    }
    public function initializeProxy() : bool
    {
        return $this->initializerb791b && ($this->initializerb791b->__invoke($valueHolderba8a2, $this, 'initializeProxy', array(), $this->initializerb791b) || 1) && $this->valueHolderba8a2 = $valueHolderba8a2;
    }
    public function isProxyInitialized() : bool
    {
        return null !== $this->valueHolderba8a2;
    }
    public function getWrappedValueHolderValue()
    {
        return $this->valueHolderba8a2;
    }
}

if (!\class_exists('EntityManager_9a5be93', false)) {
    \class_alias(__NAMESPACE__.'\\EntityManager_9a5be93', 'EntityManager_9a5be93', false);
}
