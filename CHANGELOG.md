# 1.0.0 - Main changes (previous release 0.X)

## Props Injection

The _Inject_ decorator does not requires ClassType as parameter.

Before, was used with parameter of ClassType:
```tsx
class ModelProps {
  @Inject(CounterModel) counterModel: CounterModel;
}
```

Now, it must be call directly without parameter:
```tsx
class ModelProps {
  @Inject counterModel: CounterModel;
}
```

## Dependencies

The _Dependency_ decorate was changed to _Inject_.

Before:
```tsx
@Dependency(CounterModel) counterModel: CounterModel;
```

After:
```tsx
@Inject counterModel: CounterModel;
```

## Trigger

The _ActionListener_ decorator was changed to _Trigger_ and acceps the ClassType instead a string.

Before:
```tsx
@ActionListener('CounterModel', 'add')
  eventAfterCounterAdd() {
    ...
  }
```

After:
```tsx
@Trigger(CounterModel, 'add')
  eventAfterCounterAdd() {
    ...
  }
```